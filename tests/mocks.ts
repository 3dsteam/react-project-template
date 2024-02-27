import { setupServer } from "msw/node";
import { handlers } from "@msw/handlers.ts";

const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
// If you want to reset the handlers after each test, uncomment the line below,
// or you can reset the handlers after each test manually. (e.g. afterAll(() => server.resetHandlers()); in a describe block)
// afterEach(() => server.resetHandlers());

export { server };
