import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import Home from "../index.tsx";

expect.extend(matchers);

describe("Home page", () => {
    it("renders component", () => {
        const { getByTestId } = render(<Home />);
        expect(getByTestId("home")).toBeInTheDocument();
    });
});
