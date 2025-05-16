import { request } from "./fetch.ts";

interface IResponse {
    token: string;
    refreshToken?: string;
    user: Record<string, unknown>;
}

export const postSignIn = async (args: { username: string; password: string }) => {
    return request<IResponse>("/sign-in", { method: "POST", body: JSON.stringify(args) });
};
