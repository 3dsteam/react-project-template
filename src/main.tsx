import React from "react";
import ReactDOM from "react-dom/client";
import browserWorker from "@mocks/browser.ts";
import i18next from "i18next";
import i18n from "./i18n.ts";
import { setLocalStorage } from "@utils/storage.ts";
import "./global.scss";

// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// TanStack Router
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Mocking Service Worker
const enableMock = async () => {
    if (!import.meta.env.DEV) return;
    // Start the mock
    return browserWorker.start();
};

// Create a client
const queryClient = new QueryClient();

// Router gen
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

void (async () => {
    // Initialize i18n
    await i18n();
    // Enable mocking
    await enableMock();
    // Watch the language change
    i18next.on("languageChanged", (lng) => {
        // Update document language
        setLocalStorage("i18NextLng", lng);
    });
    // Render App
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </React.StrictMode>,
    );
})();
