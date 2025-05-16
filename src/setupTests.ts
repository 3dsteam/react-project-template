import { server } from "@mocks/node";
import "@testing-library/jest-dom/vitest";
import { changeLanguage } from "@tests/i18next";

// Mock the i18next library
vi.mock("react-i18next", () => ({
    //This mock makes sure any components using the translation hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string, args?: Record<string, string | number>) => {
                // Replace the placeholders with the values
                for (const [key, value] of Object.entries(args ?? {})) {
                    str = str.replace(new RegExp(`{{${key}}}`, "g"), value.toString());
                }
                // Return the translated string
                return `TRANSLATED: ${str}`;
            },
            i18n: {
                language: "en",
                changeLanguage,
                // Mock events
                on: vi.fn(),
            },
        };
    },
}));

beforeAll(() => {
    // Start mock server
    server.listen();
});

afterEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    // Close mock server
    server.close();
});
