import { beforeEach, describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInForm from "@components/sign-in-form";

const callback = vi.fn();

describe("Default", () => {
    beforeEach(() => {
        render(<SignInForm onSubmit={callback} />);
    });

    it("renders the sign in form component", () => {
        expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
    });

    it("renders the identification input", () => {
        expect(screen.getByTestId("identification-input")).toBeInTheDocument();
    });

    it("renders the password input", () => {
        expect(screen.getByTestId("password-input")).toHaveAttribute("type", "password");
    });

    it("renders the submit button", () => {
        expect(screen.getByTestId("btn-submit")).toBeInTheDocument();
    });

    describe("When the form is submitted and the form is valid", () => {
        beforeEach(() => {
            // Fill the form
            fireEvent.change(screen.getByTestId("identification-input"), { target: { value: "lorem.ipsum" } });
            fireEvent.change(screen.getByTestId("password-input"), { target: { value: "my-password" } });
            // Submit the form
            fireEvent.click(screen.getByTestId("btn-submit"));
        });

        it("calls the onSubmit callback", () => {
            expect(callback).toHaveBeenCalledWith({
                identification: "lorem.ipsum",
                password: "my-password",
            });
        });
    });

    describe("When the form is submitted and the form is invalid", () => {
        beforeEach(() => {
            // Submit the form
            fireEvent.click(screen.getByTestId("btn-submit"));
        });

        it("doesn't call the onSubmit callback", () => {
            expect(callback).not.toHaveBeenCalled();
        });

        it("renders the identification input error", () => {
            expect(screen.getByTestId("identification-error")).toHaveTextContent("This field is required");
        });

        it("renders the password input error", () => {
            expect(screen.getByTestId("password-error")).toHaveTextContent("This field is required");
        });
    });

    describe("When press on password eye icon", () => {
        beforeEach(() => {
            fireEvent.mouseDown(screen.getByTestId("password-eye"));
        });

        it("renders the password input as text", () => {
            expect(screen.getByTestId("password-input")).toHaveAttribute("type", "text");
        });
    });
});

describe("When identification type is email", () => {
    beforeEach(() => {
        render(<SignInForm identificationType="email" onSubmit={callback} />);
    });

    it("renders the identification input as email", () => {
        expect(screen.getByTestId("identification-input")).toHaveAttribute("type", "email");
    });

    describe("When submit the form with invalid email", () => {
        beforeEach(() => {
            // Fill the form
            fireEvent.change(screen.getByTestId("identification-input"), { target: { value: "lorem.ipsum" } });
            fireEvent.change(screen.getByTestId("password-input"), { target: { value: "my-password" } });
            // Submit the form
            fireEvent.click(screen.getByTestId("btn-submit"));
        });

        it("doesn't call the onSubmit callback", () => {
            expect(callback).not.toHaveBeenCalled();
        });

        it("renders the identification input error", () => {
            expect(screen.getByTestId("identification-error")).toHaveTextContent("Please enter a valid email address");
        });
    });
});
