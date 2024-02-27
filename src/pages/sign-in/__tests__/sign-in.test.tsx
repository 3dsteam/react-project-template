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

    describe.skip("When the request is successful", () => {
        it("calls the Redux authentication action", async () => {
            await waitFor(() =>
                expect(vi.mocked(authStore.authenticate)).toHaveBeenCalledWith({
                    token: "JWT Token",
                    user: { id: "1", email: "lorem.ipsum@gmail.com" },
                }),
            );
        });
    });

    describe.skip("When the request is unsuccessful", () => {
        it("doesn't call the Redux authentication action", () => {
            expect(vi.mocked(authStore.authenticate)).not.toHaveBeenCalled();
        });

        it("displays an error message", () => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Username or password are incorrect");
        });
    });
});
