import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: AppLayout,
});

function AppLayout() {
    return (
        <main id="app-layout" className="w-screen h-screen overflow-y-auto">
            <Outlet />
        </main>
    );
}
