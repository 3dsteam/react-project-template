import { renderWithProviders } from "@store/test-utils.tsx";
import { act, screen, waitFor } from "@testing-library/react";
import SignIn from "../sign-in";
import SignInForm from "@components/sign-in-form";
import * as authStore from "@store/reducers/auth.ts";
import { afterEach } from "vitest";

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

    it("calls the sign-in mutation", () => {
        // Gel last call from fetchMock
        const postRequest = fetchMock.mock.calls[fetchMock.mock.calls.length - 1]?.[0];
        const requestBody = (postRequest as Request | undefined)?.body as unknown as Buffer;
        const body = JSON.parse(Buffer.from(requestBody).toString("utf-8")) as Record<string, string>;
        // Check if the request body is correct
        expect(body).toStrictEqual({
            email: "lorem.ipsum@gmail.com",
            password: "Ipsum1@34!",
        });
    });

    describe("When the request is successful", () => {
        beforeAll(() => {
            // Mock success response
            fetchMock.mockResponse(() =>
                JSON.stringify({
                    data: {
                        token: "JWT Token",
                        user: { id: "1", email: "lorem.ipsum@gmail.com" },
                    },
                }),
            );
        });

        it("calls the Redux authentication action", async () => {
            await waitFor(() =>
                expect(vi.mocked(authStore.authenticate)).toHaveBeenCalledWith({
                    token: "JWT Token",
                    user: { id: "1", email: "lorem.ipsum@gmail.com" },
                }),
            );
        });
    });

    describe("When the request is unsuccessful", () => {
        beforeAll(() => {
            // Mock error response
            fetchMock.mockResponse(() => ({
                status: 401,
                body: JSON.stringify({
                    error: {
                        message: "Username or password are incorrect",
                    },
                }),
            }));
        });

        it("doesn't call the Redux authentication action", () => {
            expect(vi.mocked(authStore.authenticate)).not.toHaveBeenCalled();
        });

        it("displays an error message", () => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Username or password are incorrect");
        });
    });
});
