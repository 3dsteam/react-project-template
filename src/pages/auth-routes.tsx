import { useCallback, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { expire } from "@store/reducers/auth.ts";
import { callbackOnJwtExpired, isJwtExpired } from "@utils/jwt.ts";

export default function AuthRoutes() {
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

    if (!auth.isAuth) {
        // Get origin
        const from = location.hash ? location.hash.slice(1) : location.pathname;
        // Redirect to sign-in page
        return <Navigate to="/sign-in" replace={true} state={{ from }} />;
    }

    return (
        <div data-testid="auth-routes">
            <Outlet />
        </div>
    );
}
