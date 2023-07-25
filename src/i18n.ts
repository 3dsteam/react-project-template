import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";

void i18next
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem("i18NextLng") || navigator.language,
        fallbackLng: "en",
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
