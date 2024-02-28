import { beforeAll, beforeEach, describe, expect } from "vitest";
import * as ReactRouterDom from "react-router-dom";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";
import { renderWithProviders } from "@store/test-utils.tsx";
import { screen } from "@testing-library/react";

vi.mock("react-router-dom", async () => ({
    ...(await vi.importActual("react-router-dom")),
}));

describe("When session is not authenticated", () => {
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/sign-in"]}>
            <Switch>
                <GuestOnlyRoutes path="/sign-in" exact Component={() => <div data-testid="sign-in" />} />
            </Switch>
        </MemoryRouter>
    );

    beforeEach(() => {
        renderWithProviders(Router, {
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

    it("renders the page", () => {
        expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    });
});

describe("When session is authenticated", () => {
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/sign-in"]}>
            <Switch>
                <GuestOnlyRoutes path="/sign-in" exact Component={() => <div data-testid="sign-in" />} />
                <Route path="/" exact component={() => <div data-testid="home" />} />
            </Switch>
        </MemoryRouter>
    );

    beforeEach(() => {
        renderWithProviders(Router, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: null,
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
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/sign-in"]}>
            <Switch>
                <GuestOnlyRoutes path="/sign-in" Component={() => <div data-testid="sign-in" />} />
                <Route path="/" exact component={() => <div data-testid="home" />} />
                <Route path="/admin" exact component={() => <div data-testid="admin" />} />
            </Switch>
        </MemoryRouter>
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
        renderWithProviders(Router, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: null,
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
