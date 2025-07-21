import { useAuthStore } from "@store/auth-store.ts";
import { useToastStore } from "@store/toast-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
    /**
     * Check if the user is authenticated
     * If not, redirect to the sign-in page
     */
    beforeLoad: () => {
        if (!useAuthStore.getState().isAuth()) {
            // Clear all toast notifications
            useToastStore.getState().clearAllToasts();
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({ to: "/sign-in" });
        }
    },
});

function RouteComponent() {
    return <Outlet />;
}
