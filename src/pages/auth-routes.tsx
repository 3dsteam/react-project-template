import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { useCallback, useEffect } from "react";
import { callbackOnJwtExpired, isJwtExpired } from "@utils/jwt.ts";
import { expire } from "@store/reducers/auth";
import Rest from "../api/rest.ts";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoutes() {
    const auth = useAppSelector((state) => state.auth.data);
    const dispatch = useAppDispatch();

    const handleExpire = useCallback(() => {
        // Reset axios authorization header
        Rest.setHeaders({ Authorization: "" });
        dispatch(expire());
    }, [dispatch]);

    useEffect(() => {
        if (auth.isAuth && !isJwtExpired(auth.token!)) {
            // Set axios authorization header
            Rest.setHeaders({ Authorization: `JWT ${auth.token!}` });
            // Set expiration call at timeout
            const expTimeout = callbackOnJwtExpired(auth.token!, handleExpire);
            return () => void clearTimeout(expTimeout);
        } else if (auth.isAuth) {
            // Expire session
            handleExpire();
        }
    }, [auth, handleExpire]);

    if (!auth.isAuth) {
        // Redirect to sign-in page
        return <Navigate to="/sign-in" replace={true} state={{ from: location.pathname }} />;
    }

    return (
        <div data-testid="auth-routes">
            <Outlet />
        </div>
    );
}
