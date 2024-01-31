import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { useCallback, useEffect, useState } from "react";
import { callbackOnJwtExpired, isJwtExpired } from "@utils/jwt.ts";
import { expire } from "@store/reducers/auth.ts";
import Rest from "../api/rest.ts";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoutes() {
    const auth = useAppSelector((state) => state.auth.data);
    const dispatch = useAppDispatch();

    const [ready, setReady] = useState(false);

    const handleExpire = useCallback(() => {
        // Reset axios authorization header
        Rest.setHeaders({ Authorization: "" });
        dispatch(expire());
    }, [dispatch]);

    useEffect(() => {
        if (auth.isAuth && !isJwtExpired(auth.token!)) {
            // Set axios authorization header
            Rest.setHeaders({ Authorization: `JWT ${auth.token!}` });
            // Set ready
            setReady(true);
            // Set expiration call at timeout
            const expTimeout = callbackOnJwtExpired(auth.token!, handleExpire);
            return () => void clearTimeout(expTimeout);
        } else if (auth.isAuth) {
            // Expire session
            handleExpire();
        }
    }, [auth, handleExpire]);

    if (!auth.isAuth) {
        // Get origin
        const from = location.hash ? location.hash.slice(1) : location.pathname;
        // Redirect to sign-in page
        return <Navigate to="/sign-in" replace={true} state={{ from }} />;
    }

    return <div data-testid="auth-routes">{ready && <Outlet />}</div>;
}
