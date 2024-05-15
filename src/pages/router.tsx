import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AuthRoutes from "@pages/auth-routes.tsx";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";

// Pages
import Home from "./home";

const router = createBrowserRouter([
    {
        element: <AuthRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/admin-example",
                lazy: async () => {
                    const AdminExample = (await import("@pages/admin-example")).default;
                    return { element: <AdminExample /> };
                },
            },
        ],
    },
    {
        element: <GuestOnlyRoutes />,
        children: [
            {
                path: "/sign-in",
                lazy: async () => {
                    const SignIn = (await import("@pages/sign-in")).default;
                    return { element: <SignIn /> };
                },
            },
        ],
    },
    // Redirect on 404
    { path: "*", element: <Navigate to="/" /> },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
