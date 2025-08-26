import Logo from "@assets/logo.svg";
import { useToastStore } from "@store/toast-store";
import { ToastUtility } from "@syncfusion/ej2-react-notifications";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { Fragment, useEffect, useTransition } from "react";
import { initReactI18next } from "react-i18next";

import { name, version as pkgVersion } from "../../package.json";

export const Route = createRootRoute({ component: AppLayout });

function AppLayout() {
    const toast = useToastStore((state) => state.toast);

    const [isPending, startTransition] = useTransition();

    const { data: version } = useQuery({
        queryKey: ["version"],
        queryFn: async () => {
            const res = await fetch("/version.json?ts=" + Date.now());
            const { version } = (await res.json()) as { version: string; ts: number };
            return version;
        },
        // Refetch every 5 minutes
        refetchInterval: 5 * 60 * 1000,
    });

    useEffect(() => {
        // Initialize i18n and set the language
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

    if (isPending) {
        return (
            <main className="flex flex-col h-screen w-screen items-center justify-center space-y-4">
                <img src={Logo} alt="Loading" className="w-32 h-32" />
                <p className="text-lg">Loading...</p>
            </main>
        );
    }

    return (
        <Fragment>
            <Outlet />
            {/* New version message */}
            {version && pkgVersion !== version && (
                /* TODO: change message component */
                <div className="fixed bottom-4 right-4 p-4 bg-yellow-200 border border-yellow-400 rounded">
                    <p>A new version of the application is available!</p>
                    <p>
                        <small>
                            If the problem persists, refresh the page with <b>Ctrl+F5</b>
                        </small>
                    </p>
                    <button className="text-blue-600 mt-4" onClick={() => window.location.reload()}>
                        Refresh page
                    </button>
                </div>
            )}
        </Fragment>
    );
}
