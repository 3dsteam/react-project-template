import { createRootRoute, Outlet } from "@tanstack/react-router";
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { useEffect, useTransition } from "react";
import { initReactI18next } from "react-i18next";
import { name } from "../../package.json";
import Logo from "@assets/logo.svg";

export const Route = createRootRoute({ component: AppLayout });

function AppLayout() {
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            // Get saved language from localStorage
            const savedLanguage = localStorage.getItem(`${name}-language`) ?? navigator.language.split("-")[0];
            // Initialize i18n
            await i18next
                .use(I18NextHttpBackend)
                .use(initReactI18next)
                .init({
                    lng: savedLanguage,
                    fallbackLng: "en",
                    debug: import.meta.env.DEV,
                    interpolation: { escapeValue: false },
                });
        });

        // Watch the language change
        i18next.on("languageChanged", (lng) => {
            // Update document language
            localStorage.setItem(`${name}-language`, lng);
        });
    }, []);

    if (isPending)
        return (
            <main>
                <img src={Logo} alt="Loading..." />
            </main>
        );
    return <Outlet />;
}
