import { beforeAll, beforeEach, describe, expect } from "vitest";
import * as ReactRouterDom from "react-router-dom";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";
import { renderWithProviders } from "@tests/store.tsx";
import { screen } from "@testing-library/react";

vi.mock("react-router-dom", async () => ({
    ...(await vi.importActual("react-router-dom")),
}));

describe("When session is not authenticated", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <GuestOnlyRoutes />,
                children: [
                    {
                        path: "/sign-in",
                        element: <div data-testid="sign-in" />,
                    },
                ],
            },
            {
                path: "/",
                element: <div data-testid="" />,
            },
        ],
        {
            initialEntries: ["/sign-in"],
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

    it("renders the page", () => {
        expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    });
});

describe("When session is authenticated", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <GuestOnlyRoutes />,
                children: [
                    {
                        path: "/sign-in",
                        element: <div data-testid="sign-in" />,
                    },
                ],
            },
            {
                path: "/",
                element: <div data-testid="home" />,
            },
        ],
        {
            initialEntries: ["/sign-in"],
        },
    );

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: null,
                        refreshToken: null,
                        user: null,
                    },
                },
            },
        });
    });

    it("redirects to home page", () => {
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });
});

describe("When session has a previous page to redirect to", () => {
    const router = ReactRouterDom.createMemoryRouter(
        [
            {
                element: <GuestOnlyRoutes />,
                children: [
                    {
                        path: "/sign-in",
                        element: <div data-testid="sign-in" />,
                    },
                ],
            },
            {
                path: "/",
                element: <div data-testid="home" />,
            },
            {
                path: "/admin",
                element: <div data-testid="admin" />,
            },
        ],
        {
            initialEntries: ["/sign-in"],
        },
    );

    beforeAll(() => {
        // Mock location state
        vi.spyOn(ReactRouterDom, "useLocation").mockReturnValue({
            key: "",
            pathname: "/sign-in",
            state: { from: "/admin" },
            hash: "",
            search: "",
        });
    });

    beforeEach(() => {
        renderWithProviders(<ReactRouterDom.RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: null,
                        refreshToken: null,
                        user: null,
                    },
                },
            },
        });
    });

    it("redirects to previous page", () => {
        expect(screen.getByTestId("admin")).toBeInTheDocument();
    });
});
