import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import "./mocks.ts";
import "./i18n.ts";

afterEach(() => {
    vi.clearAllMocks();
});

// Mock window.computeStyle
window.getComputedStyle = vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn().mockReturnValue("auto"),
}));
