import { beforeEach, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Admin from "@pages/admin";

beforeEach(() => {
    render(<Admin />);
});

it("renders the admin page", () => {
    expect(screen.getByTestId("admin-page")).toBeInTheDocument();
});

it("doesn't render the detail panel by default", () => {
    expect(screen.queryByTestId("detail-panel")).not.toBeInTheDocument();
});

describe("When user click on detail panel button", () => {
    beforeEach(() => {
        fireEvent.click(screen.getByTestId("btn-detail-panel"));
    });

    it("renders the detail panel", () => {
        expect(screen.getByTestId("detail-panel")).toBeInTheDocument();
    });
});
