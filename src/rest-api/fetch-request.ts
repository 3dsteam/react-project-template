import { ApiError, type IApiError } from "@models/error";
import { useAuthStore } from "@store/auth-store";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import i18next from "i18next";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REST_BASE_URL as string,
    timeout: import.meta.env.VITE_REST_TIMEOUT ? parseInt(import.meta.env.VITE_REST_TIMEOUT as string) : 30000, // Default: 30 seconds,
});

export const request = async <T extends object>(url: string, config?: AxiosRequestConfig, skip401Handle = false) => {
    // Add the token to the headers
    const headers = config?.headers ?? { "Content-Type": "application/json" };

    // Check if the token is present
    const token = useAuthStore.getState().token;
    if (token && !("Authorization" in headers)) headers.Authorization = `Bearer ${token}`;

    try {
        // Fetch the request
        const res = await axiosInstance<T | { data: T }>({ url, ...config, headers });
        // Check response is !== No Content
        if (res.status !== 204) {
            // Return the response
            const content = res.data as T | { data: T };
            return "data" in content ? content.data : content;
        }
        // Return void
        return;
    } catch (e) {
        const error = e as AxiosError;
        // Handle server error
        if (error.response) {
            const { data, status } = error.response;
            // Handle 401 error
            if (status === 401 && !skip401Handle) {
                // Expire session
                useAuthStore.getState().expire();
            }
            // If the response data is an object and contains an error
            if (data && data instanceof Object && "error" in data) {
                const apiError = ApiError.create({ ...(data.error as IApiError), status });
                // Create a new Error object with the API error details
                const errorObj = new Error(apiError.message);
                Object.assign(errorObj, apiError);
                return Promise.reject(errorObj);
            }
            // Handle 500 error
            let message = data && typeof data === "string" ? data : error.message;
            if (status === 404) message = i18next.t("Error.Service not found");
            else if (status === 500) message = i18next.t("Error.The server encountered an internal error");
            // Return a new ApiError
            const apiError = ApiError.create({ code: "UNKNOWN_ERROR", message, status });
            // Create a new Error object with the API error details
            const errorObj = new Error(apiError.message);
            Object.assign(errorObj, apiError);
            return Promise.reject(errorObj);
        }
        // Handle other errors (network errors, etc.)
        const apiError = ApiError.create({ code: "NETWORK_ERROR", message: error.message });
        const errorObj = new Error(apiError.message);
        Object.assign(errorObj, apiError);
        return Promise.reject(errorObj);
    }
};
