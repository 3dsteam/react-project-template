import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, transformErrorResponse } from "@store/services";

export const signInApi = createApi({
    reducerPath: "signInApi",
    baseQuery,
    endpoints: (builder) => ({
        signIn: builder.mutation<unknown, Record<string, string>>({
            query: (body) => ({
                url: "/sign-in",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: unknown }) => response?.data,
            transformErrorResponse,
        }),
    }),
});

export const { useSignInMutation } = signInApi;
