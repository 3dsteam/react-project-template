import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import AuthRoutes from "@pages/auth-routes.tsx";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";
import Admin from "@pages/admin";

const router = createHashRouter([
    {
        element: <AuthRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/admin",
                element: <Admin />,
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
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
