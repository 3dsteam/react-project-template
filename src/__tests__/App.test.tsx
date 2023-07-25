import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import App from "../App.tsx";

expect.extend(matchers);

describe("App", () => {
    it("renders component", () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId("app")).toBeInTheDocument();
    });
});
