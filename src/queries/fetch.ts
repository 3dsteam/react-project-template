import useAuthStore from "../store/auth.tsx";
import { IAPIError } from "@models/error.ts";

const request = async <T>(url: string, options?: RequestInit) => {
    // Check if the URL is relative
    const URL = url.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL}${url}` : url;
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
        const { error } = (await res.json()) as { error: IAPIError };
        // Console log the error
        console.error(`[FETCH ERROR]: ${error.detail}`, { request: { url, ...options }, error });
        /**useToasterStore.getState().addToast({
         title: "Request error",
         message: error.message,
         caption: error.code,
         type: "error",
         });*/

        // Handle 401 error
        if (res.status === 401) {
            // Expire session
            useAuthStore.getState().expire();
        }

        // Throw the error
        throw new Error(error.message);
    }
    // Return the response
    return ((await res.json()) as { data: T }).data;
};

export { request };
