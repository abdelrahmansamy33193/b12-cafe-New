import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

export const DEFAULT_LANG = (localStorage.getItem("lang") as "en" | "ar") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    lng: DEFAULT_LANG,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;