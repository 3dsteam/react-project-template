/**
 * SidebarMenu test cases:
 * - should render SidebarMenu component
 * - renders the items passed to it
 * - should call onItemSelect when an item is clicked
 */

import { beforeEach, describe, expect } from "vitest";
import { renderWithProviders } from "@tests/store.tsx";
import SidebarMenu from "@components/sidebar-menu";
import { fireEvent, screen } from "@testing-library/react";

// Properties
const onItemSelect = vi.fn();
const items = [
    { code: "1", text: "Item 1", iconCss: "icon" },
    { code: "2", text: "Item 2", iconCss: "icon" },
    { code: "3", text: "Item 3", iconCss: "icon" },
];

describe("Main", () => {
    beforeEach(() => {
        renderWithProviders(<SidebarMenu isOpen items={items} activeKey="2" onItemSelect={onItemSelect} />);
    });

    it("renders the sidebar menu component", () => {
        expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
    });

    it("renders the sidebar opened", () => {
        expect(screen.getByTestId("sidebar-menu")).toHaveClass("e-open");
    });

    it("renders the items passed to it", () => {
        expect(screen.getAllByTestId("sidebar-menu-item")).toHaveLength(items.length);
    });

    it("renders tht items without active class", () => {
        expect(screen.getByText("Item 1")).not.toHaveClass("active");
        expect(screen.getByText("Item 3")).not.toHaveClass("active");
    });

    it("renders the active item as activeKey", () => {
        expect(screen.getByText("Item 2")).toHaveClass("active");
    });

    describe("When use clicks on item", () => {
        beforeEach(() => {
            fireEvent.click(screen.getByText("Item 1"));
        });

        it("calls onItemSelect", () => {
            expect(onItemSelect).toHaveBeenCalledWith("1");
        });
    });
});

describe("When isOpen is false", () => {
    beforeEach(() => {
        renderWithProviders(<SidebarMenu isOpen={false} items={items} onItemSelect={onItemSelect} />);
    });

    it("renders the sidebar closed", () => {
        expect(screen.getByTestId("sidebar-menu")).toHaveClass("e-close");
    });
});
