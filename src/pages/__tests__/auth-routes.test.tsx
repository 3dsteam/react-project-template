import { vi } from "vitest";
import { renderWithProviders } from "@store/test-utils.tsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import AuthRoutes from "@pages/auth-routes.tsx";
import { generateJWT } from "@utils/__tests__/jwt.test.ts";
import { act } from "@testing-library/react";

// Define router
const router = createMemoryRouter(
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

describe("AuthRoutes", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders page when session is authenticated", () => {
        const { getByTestId } = renderWithProviders(<RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: generateJWT(),
                        user: "Lorem Ipsum",
                    },
                },
            },
        });
        expect(getByTestId("home")).toBeInTheDocument();
    });

    it("redirects to sign-in page when session is not authenticated", () => {
        const { getByTestId } = renderWithProviders(<RouterProvider router={router} />);
        expect(getByTestId("sign-in")).toBeInTheDocument();
    });

    it("redirects to sign-in page when session is expired", async () => {
        const { getByTestId } = renderWithProviders(<RouterProvider router={router} />, {
            preloadedState: {
                auth: {
                    data: {
                        isAuth: true,
                        token: generateJWT(),
                        user: "Lorem Ipsum",
                    },
                },
            },
        });

        // CHANGE ROUTE (note: in previous test the route is change to /sign-in)
        await act(() => router.navigate("/home"));
        expect(getByTestId("home")).toBeInTheDocument();

        await act(() => vi.advanceTimersByTime(3600000));
        expect(getByTestId("sign-in")).toBeInTheDocument();
    });
});
