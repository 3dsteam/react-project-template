import { beforeEach, describe, expect } from "vitest";
import { renderWithProviders } from "@tests/store.tsx";
import SidebarPanel from "@components/sidebar-panel/sidebar-panel.tsx";
import { screen } from "@testing-library/react";

describe("Main", () => {
    beforeEach(() => {
        renderWithProviders(
            <SidebarPanel isOpen={true}>
                <div data-testid="my-component">Lorem ipsum</div>
            </SidebarPanel>,
        );
    });

    it("renders the sidebar panel component", () => {
        expect(screen.getByTestId("sidebar-panel")).toBeInTheDocument();
    });

    it("renders the sidebar opened", () => {
        expect(screen.getByTestId("sidebar-panel")).toHaveClass("e-open");
    });

    it("renders children", () => {
        expect(screen.getByTestId("my-component")).toBeInTheDocument();
    });
});

describe("When isOpen is false", () => {
    beforeEach(() => {
        renderWithProviders(<SidebarPanel isOpen={false} />);
    });

    it("renders the sidebar closed", () => {
        expect(screen.getByTestId("sidebar-panel")).toHaveClass("e-close");
    });
});
