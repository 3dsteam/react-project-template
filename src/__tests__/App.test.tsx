import App from "../App.tsx";
import { renderWithProviders } from "@store/test-utils.tsx";

describe("App", () => {
    it("renders component", () => {
        const { getByTestId } = renderWithProviders(<App />);
        expect(getByTestId("app")).toBeInTheDocument();
    });
});
