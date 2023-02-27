import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "To get started, edit <1>src/App.js</1> and save to reload.":
          "To get started, edit <1>src/App.js</1> and save to reload.",
        "Welcome to React": "Welcome to React and react-i18next",
        "Rendering with React": "Rendering with React"
      }
    },
    vn: {
      translations: {
        "To get started, edit <1>src/App.js</1> and save to reload.":
          "Để bắt đầu, hãy chỉnh sửa <1> src / App.js </ 1> và lưu để tải lại.",
        "Welcome to React": "Chào mừng bạn đến với React và react-i18next",
        "Rendering with React": "Kết xuất với React"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
