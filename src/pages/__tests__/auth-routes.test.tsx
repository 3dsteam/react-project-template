import * as ReactRouterDom from "react-router-dom";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { renderWithProviders } from "@store/test-utils.tsx";
import { act, screen } from "@testing-library/react";
import { generateJWT } from "@utils/__tests__/jwt.test.ts";
import AuthRoutes from "@pages/auth-routes.tsx";

vi.mock("react-router-dom", async () => ({
    ...(await vi.importActual("react-router-dom")),
}));

beforeAll(() => {
    // Mock Navigate component
    vi.spyOn(ReactRouterDom, "Redirect");
});

describe("When session is authenticated", () => {
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/home"]}>
            <Switch>
                <AuthRoutes path="/home" exact Component={() => <div data-testid="home" />} />
            </Switch>
        </MemoryRouter>
    );

    beforeEach(() => {
        renderWithProviders(Router, {
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
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/home"]}>
            <Switch>
                <AuthRoutes path="/home" exact Component={() => <div data-testid="home" />} />
                <Route path="/sign-in" exact component={() => <div data-testid="sign-in" />} />
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

    it("calls Navigate component with previous page information on the state from", () => {
        expect(vi.mocked(ReactRouterDom.Redirect)).toHaveBeenCalledWith(
            expect.objectContaining({
                to: {
                    pathname: "/sign-in",
                    state: { from: "/home" },
                },
            }),
            expect.any(Object),
        );
    });

    it("redirects to sign-in page", () => {
        expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    });
});

describe("When session is expired", () => {
    const Router = (
        <MemoryRouter initialIndex={1} initialEntries={["/home"]}>
            <Switch>
                <AuthRoutes path="/home" exact Component={() => <div data-testid="home" />} />
                <Route path="/sign-in" exact component={() => <div data-testid="sign-in" />} />
            </Switch>
        </MemoryRouter>
    );

    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        renderWithProviders(Router, {
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
