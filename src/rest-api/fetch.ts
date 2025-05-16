import { ApiError, type IApiError } from "@models/api-error";
import { useAuthStore } from "@store/auth-store";
import i18next from "i18next";

export const request = async <T>(url: string, options?: RequestInit) => {
    // Check if the URL is relative
    const URL = url.startsWith("/") ? `${import.meta.env.VITE_REST_API}${url}` : url;

    // Add the token to the headers
    const headers = new Headers(options?.headers);
    headers.set("Content-Type", "application/json");

    // Check if the token is present
    const token = useAuthStore.getState().token;
    if (token) headers.set("Authorization", `Bearer ${token}`);

    // Fetch the request
    const res = await fetch(URL, { ...options, headers });

    // Handle response
    if (!res.ok) {
        // Handle 401 error
        if (res.status === 401) {
            // Expire session
            useAuthStore.getState().expire();
        } else if (res.status == 500) {
            // Handle 500 error
            throw new ApiError({
                code: "INTERNAL_SERVER_ERROR",
                message: i18next.t("Error.The server encountered an internal error"),
                status: res.status,
            });
        }
        // Handle other errors
        const { error } = (await res.json()) as { error: IApiError };
        // Throw the error
        throw new ApiError({ ...error, status: res.status });
    }

    // Check response is !== No Content
    if (res.status !== 204) {
        // Return the response
        return ((await res.json()) as { data: T }).data;
    }

    // Return void
    return;
};
