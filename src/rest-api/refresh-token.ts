import { request } from "./fetch.ts";

interface IResponse {
    token: string;
    refreshToken?: string;
    user: Record<string, unknown>;
}

export const postRefreshToken = async (args: { token: string }) => {
    return request<IResponse>("/refresh-token", { method: "POST", body: JSON.stringify(args) });
};
