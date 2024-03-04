import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as en from "./en";
import * as ko from "./ko";

const resources: Resource = {
  "en-US": {
    ...en,
  },
  "ko-KR": {
    ...ko,
  },
} as const;

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // use the language detector
    .init({
      resources,
      lng: "ko-KR", // if the language cannot be detected, default to Korean
      fallbackLng: {
        "en-US": ["en-US"], // if Korean fails, fallback to English
        default: ["ko-KR"],
      },
      debug: true,
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

export default i18n;