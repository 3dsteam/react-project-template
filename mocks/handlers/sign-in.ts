import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("*/sign-in", () => {
        return HttpResponse.json({
            data: {
                // Token generated with http://jwtbuilder.jamiekurtz.com/
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NTMxMTAxOTcsImV4cCI6MTc4NDY0NjE5OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.7WlpnbsGJe25SE7Sm-K1SGHoQ11Te5wSUYze1M_uy90",
                user: {
                    uuid: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                    nominative: "Lorem Ipsum",
                },
            },
        });
    }),
];
