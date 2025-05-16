import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({ component: AppLayout });

function AppLayout() {
    return <Outlet />;
}
