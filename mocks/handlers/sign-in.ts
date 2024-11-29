import { http, HttpResponse } from "msw";

export const handlers = [
    http.post(/.*\/api\/v\d+\/sign-in$/, () => {
        return HttpResponse.json({
            data: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MzI4OTAwMzEsImV4cCI6MTc2NDQyNjAzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9._v5x0tNqLN_-kmNpawJtJ2948Yce-lyLvkRDZnAPdNo",
                user: {
                    uuid: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                    nominative: "Lorem Ipsum",
                    permissions: [],
                },
            },
        });
    }),
    http.post(/.*\/api\/v\d+\/refresh-token$/, () => {
        return HttpResponse.json({
            data: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTg0MjIyOTIsImV4cCI6MTcyOTk1ODI5MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.15kvzcmttOpTXRTX2X1UQbgpzn4IiES2q9ohj7WI9ac",
                refreshToken:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTQ0NjUyMjIsImV4cCI6MTc0NjAwMTIyMywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.EFhinbstxfaetITZln89ICUSiOOY6Q5Sj4TLmJea21s",
                user: {
                    id: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                    email: "lorem.ipsum@gmail.com",
                    permissions: [],
                },
            },
        });
    }),
];
