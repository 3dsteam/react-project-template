module.exports = [
    {
        id: "base",
        routes: [
            "auth:success",
        ]
    },
    {
        id: "all-errors",
        routes: [
            "auth:error",
        ]
    },
    {
        id: "admin-user",
        from: "base",
        routes: [
            "auth:admin"
        ]
    }
];