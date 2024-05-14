import Auth, { authenticate, expire } from "@store/reducers/auth.ts";

describe("Reducer: Auth", () => {
    it("returns the initial state", () => {
        expect(Auth(undefined, { type: "" })).toEqual({
            data: {
                isAuth: false,
                token: null,
                refreshToken: null,
                user: null,
            },
        });
    });

    it("sets authentication data", () => {
        const payload = { token: "JWT Token", refreshToken: "Refresh JWT Token", user: { username: "Lorem ipsum" } };
        expect(Auth(undefined, authenticate(payload))).toEqual({
            data: {
                isAuth: true,
                token: "JWT Token",
                refreshToken: "Refresh JWT Token",
                user: { username: "Lorem ipsum" },
            },
        });
    });

    it("expires authentication data", () => {
        const data = {
            isAuth: true,
            token: "JWT Token",
            refreshToken: "Refresh JWT Token",
            user: { username: "Lorem ipsum" },
        };
        expect(Auth({ data }, expire())).toEqual({
            data: {
                isAuth: false,
                token: null,
                refreshToken: null,
                user: null,
            },
        });
    });
});
