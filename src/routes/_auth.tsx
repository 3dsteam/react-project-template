import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import useAuthStore from "../store/auth";
import { postRefreshToken } from "../queries/post.refresh-token.ts";
import { useEffect } from "react";
import { getJwtExp } from "@utils/jwt.ts";
import SidebarMenu from "@components/sidebar-menu/sidebar-menu.tsx";
import { DialogUtility } from "@syncfusion/ej2-react-popups";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
    /**
     * Check if the user is authenticated
     * If not, check for the refresh token
     * If the refresh token is not available, redirect to the sign-in page
     */
    beforeLoad: async () => {
        if (!useAuthStore.getState().isAuth()) {
            console.warn("[AUTH] beforeLoad - User is not authenticated");
            // Check for the refresh token
            const { refreshToken, expire } = useAuthStore.getState();
            if (refreshToken) {
                // Refresh the token
                try {
                    console.log("[AUTH] Refreshing token");
                    await fireRefreshToken(refreshToken);
                    // Continue
                    return;
                } catch {
                    // Expire session
                    console.warn("[AUTH] Failed to refresh token. Expire session");
                    expire();
                }
            } else {
                console.debug("[AUTH] No refresh token available");
            }
            // Throw a redirect to the sign-in page
            console.warn("[AUTH] Redirecting to sign-in page");
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({ to: "/sign-in" });
        }
    },
});

function RouteComponent() {
    const token = useAuthStore((state) => state.token);
    const refreshToken = useAuthStore((state) => state.refreshToken);

    const router = useRouter();
    useEffect(() => {
        if (!token) {
            // Expire session
            void router.invalidate();
        }
    }, [token]);

    // Watch for token expiration
    useEffect(() => {
        if (!token) return;
        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;
        let attempts = 0;

        // Get token expiration
        let expiration = getJwtExp(token) - Date.now();
        if (expiration > 2147483647) expiration = 2147483647; // Max timeout

        // Check for refresh token
        if (refreshToken) {
            console.debug("Setup refresh token 5 min before expiration", { expiration });
            // Refresh token 5 minutes before expiration
            timeout = setTimeout(
                () => {
                    try {
                        // Refresh token
                        console.log("[AUTH] Refreshing token");
                        void fireRefreshToken(refreshToken);
                    } catch {
                        // Retry refresh on error
                        console.warn("[AUTH] Failed to refresh token. Retrying...");
                        interval = setInterval(() => {
                            try {
                                void fireRefreshToken(refreshToken);
                            } catch {
                                attempts++;
                                console.warn(`[AUTH] Failed to refresh token. Attempt ${attempts}`);
                            }
                        }, 1000 * 60);
                    }
                },
                expiration - 1000 * 60 * 5,
            );
        } else {
            console.debug("Setup session expiration alert 5 min before expiration", { expiration });
            // Fire expiration alert 5 minutes before expiration
            timeout = setTimeout(
                () => {
                    console.log("[AUTH] Session expiration alert");
                    DialogUtility.alert({
                        title: "Session expiration",
                        content: "Your session is about to expire. Save your work and re-authenticate your session.",
                        okButton: { text: "Okay" },
                    });
                },
                expiration - 1000 * 60 * 5,
            );
        }

        // Expire session on timeout
        const expTimeout = setTimeout(() => {
            console.warn("[AUTH] Session expired");
            useAuthStore.getState().expire();
        }, expiration);

        // Clear timeout on exit
        return () => {
            clearTimeout(expTimeout);
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [token, refreshToken]);

    return (
        <div id="auth-layout">
            <SidebarMenu
                items={[
                    { content: "Home", iconCss: "fa-light fa-house", path: "/" },
                    {
                        content: "Grids",
                        iconCss: "fa-light fa-grid",
                        path: "/grids",
                    },
                ]}
            />
            {/* Outlet */}
            <Outlet />
        </div>
    );
}

// Functions
const fireRefreshToken = async (refreshToken: string) => {
    const res = await postRefreshToken({ token: refreshToken });
    // Authenticate session
    useAuthStore.getState().authenticate({
        token: res.token,
        user: { ...res.user, nominative: (res.user.nominative as string) ?? "Unknown user" },
    });
};
