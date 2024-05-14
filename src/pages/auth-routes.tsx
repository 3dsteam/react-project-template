import { useCallback, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { authenticate, expire } from "@store/reducers/auth.ts";
import { callbackBeforeJwtExp, callbackOnJwtExpired, isJwtExpired } from "@utils/jwt.ts";
import { useRefreshTokenMutation } from "@store/services/queries/sign-in.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function AuthRoutes() {
    const location = useLocation();

    // Store
    const auth = useAppSelector((state) => state.auth.data);
    const dispatch = useAppDispatch();

    const [dispatchRefreshToken] = useRefreshTokenMutation();

    const handleExpire = useCallback(() => {
        // Expire session
        dispatch(expire());
    }, [dispatch]);

    const handleRefreshToken = useCallback(
        async (expireOnError: boolean | undefined = false) => {
            if (!auth.refreshToken) return;
            // Call refresh token
            const res = await dispatchRefreshToken({ refreshToken: auth.refreshToken });
            if ("data" in res) {
                // Update auth data
                dispatch(authenticate(res.data));
            } else if ("error" in res) {
                const error = res.error as FetchBaseQueryError;
                // Expire session on 401
                if (error.status === 401 || expireOnError) {
                    handleExpire();
                }
            }
        },
        [auth, dispatchRefreshToken, dispatch, handleExpire],
    );

    useEffect(() => {
        if (auth.isAuth && !isJwtExpired(auth.token!)) {
            // Set refresh token call 5 minutes before expiration
            const refreshTimeout = callbackBeforeJwtExp(auth.token!, () => void handleRefreshToken(), 1000 * 60 * 5);
            // Set expiration call at timeout
            const expTimeout = callbackOnJwtExpired(auth.token!, () => void handleRefreshToken(true));
            // Clear on exit
            return () => {
                void clearTimeout(refreshTimeout);
                void clearTimeout(expTimeout);
            };
        } else if (auth.isAuth) {
            // Expire session
            void handleRefreshToken(true);
        }
    }, [auth, handleRefreshToken]);

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
