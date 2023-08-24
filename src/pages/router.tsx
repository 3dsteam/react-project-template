import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import AuthRoutes from "@pages/auth-routes.tsx";

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
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
