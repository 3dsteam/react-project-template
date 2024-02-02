module.exports = [
    {
        id: "auth", // route id
        url: "/auth/sign-in", // url in express format
        method: "POST", // HTTP method
        variants: [
            {
                id: "success", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTg0MjIyOTIsImV4cCI6MTcyOTk1ODI5MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.15kvzcmttOpTXRTX2X1UQbgpzn4IiES2q9ohj7WI9ac",
                        user: {
                            id: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                            email: "lorem.ipsum@gmail.com",
                            permissions: [],
                        },
                    }, // body to send
                },
            },
            {
                id: "error", // variant id
                type: "json", // variant handler id
                options: {
                    status: 400, // status to send
                    body: {
                        message: "Username or password are incorrect",
                    }, // body to send
                },
            },
            {
                id: "admin", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTg0MjIyOTIsImV4cCI6MTcyOTk1ODI5MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.15kvzcmttOpTXRTX2X1UQbgpzn4IiES2q9ohj7WI9ac",
                        user: {
                            id: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                            email: "lorem.ipsum@gmail.com",
                            permissions: ["admin"],
                        },
                    }, // body to send
                },
            },
        ],
    },
];
