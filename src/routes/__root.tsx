import { createRootRoute, Outlet } from "@tanstack/react-router";
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { useEffect, useTransition } from "react";
import { initReactI18next } from "react-i18next";
import { name } from "../../package.json";
import Logo from "@assets/logo.svg";
import { useToastStore } from "@store/toast-store";
import { ToastUtility } from "@syncfusion/ej2-react-notifications";

export const Route = createRootRoute({ component: AppLayout });

function AppLayout() {
    const toast = useToastStore((state) => state.toast);

    const [isPending, startTransition] = useTransition();

    // Initialize i18n and set the language
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

    // Toast notifications
    useEffect(() => {
        if (!toast || !isPending) return;
        // Show toast notification
        ToastUtility.show({ ...toast });
    }, [toast, isPending]);

    if (isPending)
        return (
            <main className="flex flex-col h-screen w-screen items-center justify-center space-y-4">
                <img src={Logo} alt="Loading" className="w-32 h-32" />
                <p className="text-lg">Loading...</p>
            </main>
        );

    return <Outlet />;
}
