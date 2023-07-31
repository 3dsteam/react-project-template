import Auth, { authenticate, expire } from "@store/reducers/auth";

describe("Reducer: Auth", () => {
    it("returns the initial state", () => {
        expect(Auth(undefined, { type: undefined })).toEqual({
            data: {
                isAuth: false,
                token: null,
                user: null,
            },
        });
    });

    it("sets authentication data", () => {
        expect(Auth(undefined, authenticate({ token: "JWT Token", user: { username: "Lorem ipsum" } }))).toEqual({
            data: {
                isAuth: true,
                token: "JWT Token",
                user: { username: "Lorem ipsum" },
            },
        });
    });

    it("expires authentication data", () => {
        expect(
            Auth(
                {
                    data: {
                        isAuth: true,
                        token: "JWT Token",
                        user: { username: "Lorem ipsum" },
                    },
                },
                expire(),
            ),
        ).toEqual({
            data: {
                isAuth: false,
                token: null,
                user: null,
            },
        });
    });
});
