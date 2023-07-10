import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./home";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
