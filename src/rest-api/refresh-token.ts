import { request } from "./fetch-request.ts";

interface IResponse {
    token: string;
    refreshToken?: string;
    user: Record<string, unknown>;
}

export const postRefreshToken = async (data: { token: string }) => {
    return request<IResponse>("/refresh-token", { method: "POST", data });
};
