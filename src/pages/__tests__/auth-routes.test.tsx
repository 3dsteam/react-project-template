import * as ReactRouterDom from "react-router-dom";
import { renderWithProviders } from "@tests/store.tsx";
import { act, screen } from "@testing-library/react";
import { generateJWT } from "@utils/__tests__/jwt.test.ts";
import AuthRoutes from "@pages/auth-routes.tsx";
import * as authStore from "@store/reducers/auth.ts";
import { server } from "@tests/mocks.ts";
import { http, HttpResponse } from "msw";

vi.mock("react-router-dom", async () => ({
    ...(await vi.importActual("react-router-dom")),
}));

beforeAll(() => {
    // Mock Navigate component
    vi.spyOn(ReactRouterDom, "Navigate");
    vi.spyOn(authStore, "authenticate");
});

describe("When session is authenticated", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <AuthRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <div data-testid="home" />,
                    },
                ],
            },
            {
                path: "/sign-in",
                element: <div data-testid="sign-in" />,
            },
        ],
        {
            initialEntries: ["/home"],
        },
    );

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: generateJWT(),
                        refreshToken: generateJWT(),
                        user: {},
                    },
                },
            },
        });
    });

    it("renders page", () => {
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });
});

describe("When session is not authenticated", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <AuthRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <div data-testid="home" />,
                    },
                ],
            },
            {
                path: "/sign-in",
                element: <div data-testid="sign-in" />,
            },
        ],
        {
            initialEntries: ["/home"],
        },
    );

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: false,
                        token: null,
                        refreshToken: null,
                        user: null,
                    },
                },
            },
        });
    });

    it("calls Navigate component with previous page information on the state from", () => {
        expect(vi.mocked(ReactRouterDom.Navigate)).toHaveBeenCalledWith(
            expect.objectContaining({
                state: { from: "/home" },
            }),
            expect.any(Object),
        );
    });

    it("redirects to sign-in page", () => {
        expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    });
});

describe("5 minutes before expiration", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <AuthRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <div data-testid="home" />,
                    },
                ],
            },
            {
                path: "/sign-in",
                element: <div data-testid="sign-in" />,
            },
        ],
        {
            initialEntries: ["/home"],
        },
    );

    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: generateJWT(),
                        refreshToken: generateJWT(),
                        user: {},
                    },
                },
            },
        });
    });

    it("renders the page before session is expired", () => {
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });

    describe("When refresh token is successful", () => {
        it("authenticates user with new credentials", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000 - 1000 * 60 * 5));
            expect(vi.mocked(authStore.authenticate)).toHaveBeenCalled();
        });
    });

    describe("When refresh token fails with generic error", () => {
        beforeAll(() => {
            server.use(
                http.post("*/refresh-token", () => {
                    return HttpResponse.json(
                        {
                            error: {
                                requestId: "REQ_018dc6e6460b7b9abb3097435a64e041",
                                code: "BAD_REQUEST",
                                detail: "Generic error",
                                message: "This is a generic error",
                            },
                        },
                        { status: 400 },
                    );
                }),
            );
        });

        it("doesn't call authentication page", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000 - 1000 * 60 * 5));
            expect(vi.mocked(authStore.authenticate)).not.toHaveBeenCalled();
        });

        it("doesn't redirect to sign-in page", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000 - 1000 * 60 * 5));
            expect(screen.getByTestId("home")).toBeInTheDocument();
        });
    });

    describe("When refresh token fails with 401 error", () => {
        beforeAll(() => {
            server.use(
                http.post("*/refresh-token", () => {
                    return HttpResponse.json(
                        {
                            error: {
                                requestId: "REQ_018dc6e6460b7b9abb3097435a64e041",
                                code: "UNAUTHORIZED",
                                detail: "User not authenticated",
                                message: "User is not authenticated",
                            },
                        },
                        { status: 401 },
                    );
                }),
            );
        });

        it("redirects to sign-in page", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000 - 1000 * 60 * 5));
            expect(screen.getByTestId("sign-in")).toBeInTheDocument();
        });
    });
});

describe("When session is expired", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <AuthRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <div data-testid="home" />,
                    },
                ],
            },
            {
                path: "/sign-in",
                element: <div data-testid="sign-in" />,
            },
        ],
        {
            initialEntries: ["/home"],
        },
    );

    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: generateJWT(),
                        refreshToken: generateJWT(),
                        user: {},
                    },
                },
            },
        });
    });

    it("renders the page before session is expired", () => {
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });

    describe("When refresh token is successful", () => {
        beforeAll(() => {
            server.use(
                http.post("*/refresh-token", () => {
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
            );
        });

        it("doesn't redirect to sign-in page", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000));
            expect(screen.getByTestId("home")).toBeInTheDocument();
        });
    });

    describe("When refresh token fails with generic error", () => {
        beforeAll(() => {
            server.use(
                http.post("*/refresh-token", () => {
                    return HttpResponse.json(
                        {
                            error: {
                                requestId: "REQ_018dc6e6460b7b9abb3097435a64e041",
                                code: "BAD_REQUEST",
                                detail: "Generic error",
                                message: "This is a generic error",
                            },
                        },
                        { status: 400 },
                    );
                }),
            );
        });

        it("redirects to sign-in page", async () => {
            await act(() => vi.advanceTimersByTimeAsync(3600000));
            expect(screen.getByTestId("sign-in")).toBeInTheDocument();
        });
    });
});
