import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "@store/index.ts";
import { IAPIError } from "@models/error.ts";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REST_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.data.token;
        if (token) headers.set("authorization", `Bearer ${token}`);
        return headers;
    },
});

export const transformErrorResponse = (response: FetchBaseQueryError) => {
    const data = response.data as { error: IAPIError };
    // Replace the response data with the error object
    response.data = data.error;
    return response;
};
