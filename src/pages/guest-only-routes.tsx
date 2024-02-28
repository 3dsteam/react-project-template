import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "@store/hooks.ts";

export default function GuestOnlyRoutes({ Component, ...props }: RouteProps & { Component: () => JSX.Element }) {
    const auth = useAppSelector((state) => state.auth.data);
    const location = useLocation();
    // Redirect to the previous location if the user is already authenticated
    return (
        <Route
            {...props}
            render={() =>
                !auth.isAuth ? <Component /> : <Redirect to={(location.state as { from?: string })?.from ?? "/"} />
            }
        />
    );
}
