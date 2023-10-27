import { vi } from "vitest";
import { renderWithProviders } from "@store/test-utils.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthRoutes from "@pages/auth-routes.tsx";
import { generateJWT } from "@utils/__tests__/jwt.test.ts";
import { act } from "@testing-library/react";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";
import { authenticate } from "@store/reducers/auth";

// Define router
const router = createHashRouter([
    {
        element: <AuthRoutes />,
        children: [
            {
                path: "/",
                element: <div data-testid="root" />,
            },
            {
                path: "/home",
                element: <div data-testid="home" />,
            },
        ],
    },
    {
        element: <GuestOnlyRoutes />,
        children: [
            {
                path: "/sign-in",
                element: <div data-testid="sign-in" />,
            },
        ],
    },
]);

describe("GuestOnlyRoutes", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders sign-in page when session is not authenticated", () => {
        const { getByTestId } = renderWithProviders(<RouterProvider router={router} />);
        expect(getByTestId("sign-in")).toBeInTheDocument();
    });

    it("redirects to / page when session is authenticated", () => {
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
        expect(getByTestId("root")).toBeInTheDocument();
    });

    it("redirects to previous page when session is authenticated", async () => {
        const { getByTestId, store } = renderWithProviders(<RouterProvider router={router} />, {
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

        // REDIRECT TO HOME
        await act(() => router.navigate("/home"));
        expect(getByTestId("home")).toBeInTheDocument();

        // Expire session
        await act(() => vi.advanceTimersByTime(3600000));
        expect(getByTestId("sign-in")).toBeInTheDocument();

        // Authenticated again and redirect to previous page
        await act(() => store?.dispatch(authenticate({ token: generateJWT(), user: "Lorem Ipsum" })));
        expect(getByTestId("home")).toBeInTheDocument();
    });
});
