import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const TranslationBtn = () => {
  const { t, i18n } = useTranslation("Edit");

  const toggleLocales = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
    },
    [i18n]
  );
  return (
    <div>
      <button onClick={() => toggleLocales("en-US")}>{t("en")}</button>
      <button onClick={() => toggleLocales("ko-KR")}>{t("ko")}</button>
    </div>
  );
};

export default TranslationBtn;
