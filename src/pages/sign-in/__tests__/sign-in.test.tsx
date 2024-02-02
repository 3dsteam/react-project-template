import { renderWithProviders } from "@store/test-utils.tsx";
import { act, screen } from "@testing-library/react";
import SignIn from "../sign-in";
import SignInForm from "@components/sign-in-form";
import * as signInApi from "@store/services/queries/sign-in.ts";
import * as authStore from "@store/reducers/auth.ts";

vi.mock("@components/sign-in-form");
vi.mock("@store/services/queries/sign-in.ts", async () => ({
    ...(await vi.importActual("@store/services/queries/sign-in.ts")),
}));

const signInMutation = vi.fn();

beforeAll(() => {
    // Spy on the authenticate action
    vi.spyOn(authStore, "authenticate");
    // Mocks the sign-in mutation
    vi.spyOn(signInApi, "useSignInMutation").mockReturnValue([signInMutation, { originalArgs: {}, reset: vi.fn() }]);
});

beforeEach(() => {
    renderWithProviders(<SignIn />);
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
        expect(signInMutation).toHaveBeenCalledWith({
            email: "lorem.ipsum@gmail.com",
            password: "Ipsum1@34!",
        });
    });

    describe("When the request is successful", () => {
        beforeAll(() => {
            // Mock the sign-in mutation response
            vi.spyOn(signInApi, "useSignInMutation").mockReturnValue([
                signInMutation,
                {
                    data: { token: "JWT Token", user: { id: "1", email: "lorem.ipsum@gmail.com" } },
                    originalArgs: {},
                    reset: vi.fn(),
                },
            ]);
        });

        it("calls the Redux authentication action", () => {
            expect(vi.mocked(authStore.authenticate)).toHaveBeenCalledWith({
                token: "JWT Token",
                user: { id: "1", email: "lorem.ipsum@gmail.com" },
            });
        });
    });

    describe("When the request is unsuccessful", () => {
        beforeAll(() => {
            vi.clearAllMocks();
            // Mock the sign-in mutation response
            vi.spyOn(signInApi, "useSignInMutation").mockReturnValue([
                signInMutation,
                {
                    error: {
                        data: {
                            requestId: "REQ#01",
                            code: "UNAUTHORIZED",
                            detail: "Username doesn't exist",
                            message: "Username or password are incorrect",
                        },
                    },
                    originalArgs: {},
                    reset: vi.fn(),
                },
            ]);
        });

        it("doesn't call the Redux authentication action", () => {
            expect(vi.mocked(authStore.authenticate)).not.toHaveBeenCalled();
        });

        it("displays an error message", () => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Username or password are incorrect");
        });
    });
});
