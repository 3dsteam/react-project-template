import { useAuthStore } from "@store/auth-store.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
    component: RouteComponent,
    /**
     * Check if the user is authenticated
     * If so, redirect to the home page
     */
    beforeLoad: () => {
        if (useAuthStore.getState().isAuth()) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({ to: "/" });
        }
    },
});

function RouteComponent() {
    return <>Sign In</>;
}
