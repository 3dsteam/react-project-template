import * as TanstackQuery from "@integrations/tanstack-query/root-provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: { ...TanstackQuery.getContext() },
    // Configure the router
    defaultPreload: "intent",
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Enable API mocking by msw
const enableMocking = async () => {
    if (import.meta.env.PROD || import.meta.env.VITE_DISABLE_MOCK === "true") return;
    // Enable API mocking
    const { worker } = await import("../mocks/browser");
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
};

void (async () => {
    // Enable mocking
    await enableMocking();
    // Render App
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <TanstackQuery.Provider>
                <RouterProvider router={router} />
            </TanstackQuery.Provider>
        </StrictMode>,
    );
})();
