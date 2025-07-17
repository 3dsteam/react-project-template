import { server } from "@mocks/node";
import "@testing-library/jest-dom/vitest";
import "@tests/i18next";

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
