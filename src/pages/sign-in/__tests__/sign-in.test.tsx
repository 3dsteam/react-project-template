import { renderWithProviders } from "@tests/store.tsx";
import { act, screen, waitFor } from "@testing-library/react";
import SignIn from "../sign-in";
import SignInForm from "@components/sign-in-form";
import * as authStore from "@store/reducers/auth.ts";
import { server } from "@tests/mocks.ts";
import { http, HttpResponse } from "msw";

vi.mock("@components/sign-in-form");

beforeAll(() => {
    // Spy on the authenticate action
    vi.spyOn(authStore, "authenticate");
});

beforeEach(() => {
    renderWithProviders(<SignIn />);
});

afterEach(() => {
    vi.clearAllMocks();
});

it("renders the sign-in page", () => {
    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
});

describe("Elements render", () => {
    it("renders the logo", () => {
        expect(screen.getByAltText("Logo")).toBeInTheDocument();
    });

    it("renders the sign-in form", () => {
        expect(vi.mocked(SignInForm)).toHaveBeenCalled();
    });
});

describe("When the sign-in form is submitted", () => {
    beforeEach(async () => {
        // onSubmit callback
        await act(() =>
            vi.mocked(SignInForm).mock.calls[0][0].onSubmit({
                email: "lorem.ipsum@gmail.com",
                password: "Ipsum1@34!",
            }),
        );
    });

    describe("When the request is successful", () => {
        it("calls the Redux authentication action", async () => {
            await waitFor(() =>
                expect(vi.mocked(authStore.authenticate)).toHaveBeenCalledWith({
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTg0MjIyOTIsImV4cCI6MTcyOTk1ODI5MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.15kvzcmttOpTXRTX2X1UQbgpzn4IiES2q9ohj7WI9ac",
                    user: {
                        id: "df0fb575-8738-4ebe-bbdf-4f494f378c09",
                        email: "lorem.ipsum@gmail.com",
                        permissions: [],
                    },
                }),
            );
        });
    });

    describe("When the request is unsuccessful", () => {
        beforeAll(() => {
            server.use(
                http.post("*/sign-in", () => {
                    return HttpResponse.json(
                        {
                            error: {
                                requestId: "REQ_018dc6e6460b7b9abb3097435a64e041",
                                code: "UNAUTHORIZED",
                                detail: "Username not found",
                                message: "Username or password are incorrect",
                            },
                        },
                        { status: 401 },
                    );
                }),
            );
        });

        afterAll(() => {
            // Reset the server handlers
            server.resetHandlers();
        });

        it("doesn't call the Redux authentication action", () => {
            expect(vi.mocked(authStore.authenticate)).not.toHaveBeenCalled();
        });

        it("displays an error message", () => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Username or password are incorrect");
        });
    });
});
