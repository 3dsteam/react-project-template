import { useAuthStore } from "@store/auth-store.ts";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
    /**
     * Check if the user is authenticated
     * If not, redirect to the sign-in page
     */
    beforeLoad: () => {
        if (!useAuthStore.getState().isAuth()) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({ to: "/sign-in" });
        }
    },
});

function RouteComponent() {
    return <Outlet />;
}
