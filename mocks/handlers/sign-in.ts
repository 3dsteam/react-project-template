import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("*/sign-in", () => {
        return HttpResponse.json({
            data: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTg0MjIyOTIsImV4cCI6MTcyOTk1ODI5MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.15kvzcmttOpTXRTX2X1UQbgpzn4IiES2q9ohj7WI9ac",
                user: {
                    id: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                    email: "lorem.ipsum@gmail.com",
                    permissions: [],
                },
            },
        });
    }),
];
