import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@store/hooks.ts";

export default function GuestOnlyRoutes() {
    const auth = useAppSelector((state) => state.auth.data);
    const location = useLocation();

    if (auth.isAuth) {
        // Redirect to previous page or home
        return <Navigate to={(location.state as { from: string })?.from || "/"} replace={true} />;
    }

    return (
        <div data-testid="guest-only-routes">
            <Outlet />
        </div>
    );
}
