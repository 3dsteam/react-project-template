export interface AuthData {
    token: string | null;
    refreshToken: string | null;
    user: Record<string, string> | null;
}

export interface IAuthState extends AuthData {
    isAuth: boolean;
}
