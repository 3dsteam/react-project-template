import { create } from "zustand";
import { persist } from "zustand/middleware";
import { name } from "../../package.json";

interface IState {
    /**
     * Authentication token
     * If null, user is not authenticated
     * @default null
     */
    token: string | null;
    /**
     * Refresh token
     * @default null
     */
    refreshToken: string | null;
    /**
     * User data
     * @default null
     */
    user?: unknown;
}

interface IActions {
    /**
     * Check if user is authenticated
     */
    isAuth: () => boolean;
    /**
     * Authenticate session
     * @param data The authentication data
     * @param data.token The JWT token
     * @param data.refreshToken The refresh token (optional)
     * @param data.user The user data (optional)
     */
    authenticate: (data: { token: string; refreshToken?: string | null; user?: unknown }) => void;
    /**
     * Expire session
     */
    expire: () => void;
}

export const useAuthStore = create<IState & IActions>()(
    persist(
        (set, get) => ({
            token: null,
            refreshToken: null,
            user: null,

            isAuth: () => {
                if (!get().token) return false;
                return !isJwtExpired(get().token!);
            },

            authenticate: (args) => set(args),
            expire: () => set({ token: null, refreshToken: null }),
        }),
        { name: `${name}-authentication`, version: 1 },
    ),
);

const getJwtExp = (token: string): number => {
    const jwtObjects = token.split(".");
    if (jwtObjects.length === 0) return 0;
    const decoded = window.atob(jwtObjects[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return JSON.parse(decoded).exp * 1000;
};

const isJwtExpired = (token: string): boolean => {
    return Date.now() >= getJwtExp(token);
};
