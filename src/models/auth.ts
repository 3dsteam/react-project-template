export interface IAuthState {
    isAuth: boolean;
    token: string | null;
    user: Record<string, unknown> | null;
}
