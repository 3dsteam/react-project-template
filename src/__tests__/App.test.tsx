import { describe, expect, it } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import App from "../App.tsx";
import { renderWithProviders } from "@store/test-utils.tsx";

expect.extend(matchers);

describe("App", () => {
    it("renders component", () => {
        const { getByTestId } = renderWithProviders(<App />);
        expect(getByTestId("app")).toBeInTheDocument();
    });
});
