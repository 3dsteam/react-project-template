import { create } from "zustand";
import { persist } from "zustand/middleware";
import { name } from "../../package.json";
import { isJwtExpired } from "@utils/jwt.ts";

type IAuthUser = {
    uuid?: string;
    nominative: string;
} & Record<string, unknown>;

interface IState {
    token: string | null;
    refreshToken: string | null;
    user: IAuthUser | null;
}

interface IActions {
    /**
     * Check if user is authenticated
     * @returns boolean
     */
    isAuth: () => boolean;
    /**
     * Authenticate session
     * @param data
     */
    authenticate: (data: { token: string; refreshToken?: string | null; user: IAuthUser }) => void;
    /**
     * Expire session
     */
    expire: () => void;
}

const useAuthStore = create(
    persist<IState & IActions>(
        (set, get) => ({
            token: null,
            refreshToken: null,
            user: null,
            // Actions
            isAuth: () => {
                if (!get().token) return false;
                return !isJwtExpired(get().token!);
            },
            authenticate: (data) => set({ ...data, refreshToken: data.refreshToken ?? null }),
            expire: () => set({ token: null, user: null }),
        }),
        { name: `${name}-authentication` },
    ),
);

export type { IAuthUser };
export default useAuthStore;
