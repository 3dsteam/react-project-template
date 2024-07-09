import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { getLocalStorage } from "@utils/storage.ts";

export default async function (fallbackLng?: string) {
    await i18next
        .use(I18NextHttpBackend)
        .use(initReactI18next)
        .init({
            lng: (getLocalStorage("i18NextLng") as string) ?? navigator.language,
            fallbackLng: fallbackLng ?? "en",
            debug: import.meta.env.DEV,
            interpolation: {
                escapeValue: false,
            },
        });
}
