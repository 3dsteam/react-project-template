import { useCallback, useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { expire } from "@store/reducers/auth.ts";
import { callbackOnJwtExpired, isJwtExpired } from "@utils/jwt.ts";

export default function AuthRoutes({ Component, ...props }: RouteProps & { Component: () => JSX.Element }) {
    const auth = useAppSelector((state) => state.auth.data);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleExpire = useCallback(() => {
        // Expire session
        dispatch(expire());
    }, [dispatch]);

    useEffect(() => {
        if (auth.isAuth && !isJwtExpired(auth.token!)) {
            // Set expiration call at timeout
            const expTimeout = callbackOnJwtExpired(auth.token!, handleExpire);
            return () => void clearTimeout(expTimeout);
        } else if (auth.isAuth) {
            // Expire session
            handleExpire();
        }
    }, [auth, handleExpire]);

    // Redirect to the sign-in page if the user is not authenticated
    return (
        <Route
            {...props}
            render={() =>
                auth.isAuth ? (
                    <Component />
                ) : (
                    <Redirect to={{ pathname: "/sign-in", state: { from: location.pathname } }} />
                )
            }
        />
    );
}
