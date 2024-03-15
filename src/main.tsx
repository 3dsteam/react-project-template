import React from "react";
import ReactDOM from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";
import i18next from "i18next";
import i18n from "./i18n.ts";
import { setLocalStorage } from "@utils/storage.ts";
import { Provider as ReduxProvider } from "react-redux";
import store from "@store/index";
import App from "./App.tsx";
import "./global.scss";

// Syncfusion License
registerLicense((import.meta.env.VITE_SYNCFUSION_KEY as string) ?? "");

void (async () => {
    // Initialize i18n
    await i18n();
    // Watch the language change
    i18next.on("languageChanged", (lng) => {
        // Update document language
        setLocalStorage("i18NextLng", lng);
    });
    // Render App
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </React.StrictMode>,
    );
})();
