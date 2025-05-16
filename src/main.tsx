import * as TanstackQuery from "@integrations/tanstack-query/root-provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";

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
    if (import.meta.env.PROD) return;
    // Enable API mocking
    const { worker } = await import("./mocks/browser");
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
};

void (async () => {
    // Initialize i18n
    await i18next
        .use(I18NextHttpBackend)
        .use(initReactI18next)
        .init({
            lng: navigator.language,
            fallbackLng: "en",
            debug: import.meta.env.DEV,
            interpolation: { escapeValue: false },
        });

    // Watch the language change
    i18next.on("languageChanged", (lng) => {
        // Update document language
        console.log("Language changed to", lng);
    });

    // Enable mocking
    await enableMocking();

    // Render App
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    );
})();
