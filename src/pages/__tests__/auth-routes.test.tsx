import * as ReactRouterDom from "react-router-dom";
import { renderWithProviders } from "@store/test-utils.tsx";
import { act, screen } from "@testing-library/react";
import { generateJWT } from "@utils/__tests__/jwt.test.ts";
import AuthRoutes from "@pages/auth-routes.tsx";

vi.mock("react-router-dom", async () => ({
    ...(await vi.importActual("react-router-dom")),
}));

beforeAll(() => {
    // Mock Navigate component
    vi.spyOn(ReactRouterDom, "Navigate");
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
                        user: {},
                    },
                },
            },
        });
    });

    it("renders the page before session is expired", () => {
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });

    it("redirects to sign-in page when session is expired", async () => {
        await act(() => vi.advanceTimersByTime(3600000));
        expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    });
});
