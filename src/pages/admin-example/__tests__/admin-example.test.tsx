import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminExample from "@pages/admin-example";

beforeEach(() => {
    render(<AdminExample />);
});

it("renders the admin example page", () => {
    expect(screen.getByTestId("admin-example")).toBeInTheDocument();
});
