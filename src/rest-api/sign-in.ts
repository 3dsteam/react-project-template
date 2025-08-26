import { request } from "./__request.ts";

interface IResponse {
    token: string;
    refreshToken?: string;
    user: Record<string, unknown>;
}

export const postSignIn = async (data: { username: string; password: string }) => {
    return request<IResponse>("/sign-in", { method: "POST", data });
};
