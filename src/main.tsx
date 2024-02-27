import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import store from "@store/index";
import { registerLicense } from "@syncfusion/ej2-base";
import App from "./App.tsx";
import i18n from "./i18n.ts";
import "./global.scss";

// Syncfusion License
registerLicense((import.meta.env.VITE_SYNCFUSION_KEY as string) ?? "");

void (async () => {
    // Initialize i18n
    await i18n();
    // Render App
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </React.StrictMode>,
    );
})();
