import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import AuthRoutes from "@pages/auth-routes.tsx";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";

const router = createHashRouter([
    {
        element: <AuthRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        element: <GuestOnlyRoutes />,
        children: [
            {
                path: "/sign-in",
                element: <div data-testid="sign-in">Sign In</div>,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
