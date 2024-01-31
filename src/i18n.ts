import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";

export default async function (fallbackLng?: string) {
    await i18next
        .use(I18NextHttpBackend)
        .use(initReactI18next)
        .init({
            lng: localStorage.getItem("i18NextLng") ?? navigator.language?.split("-")[0]?.toLowerCase(),
            fallbackLng: fallbackLng ?? "en",
            debug: import.meta.env.DEV,
            interpolation: {
                escapeValue: false,
            },
        });
}
