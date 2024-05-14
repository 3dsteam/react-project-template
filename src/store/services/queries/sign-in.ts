import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, transformErrorResponse } from "@store/services";
import { AuthData } from "@models/auth.ts";

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
        refreshToken: builder.mutation<AuthData, { refreshToken: string }>({
            query: (body) => ({
                url: "/refresh-token",
                method: "POST",
                headers: {
                    // Override authorization header with the refresh token
                    authorization: `Bearer ${body.refreshToken}`,
                },
            }),
            transformResponse: (response: { data: AuthData }) => response?.data,
            transformErrorResponse,
        }),
    }),
});

export const { useSignInMutation, useRefreshTokenMutation } = signInApi;
