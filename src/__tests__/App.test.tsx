import { render, screen } from "@testing-library/react";
import App from "../App.tsx";
import Router from "@pages/router.tsx";

vi.mock("@pages/router.tsx");

beforeEach(() => {
    render(<App />);
});

it("renders correctly", () => {
    expect(screen.getByTestId("app")).toBeInTheDocument();
});

it("renders router", () => {
    expect(vi.mocked(Router)).toHaveBeenCalled();
});
