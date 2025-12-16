
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Inline resources to ensure stability in all environments without JSON loader config
const resources = {
  en: {
    translation: {
      "app": {
        "title": "VisionFlow"
      },
      "menu": {
        "workflows": "Workflows",
        "selfHosted": "Self-hosted"
      },
      "header": {
        "themeLight": "Light Mode",
        "themeDark": "Dark Mode",
        "language": "Language"
      }
    }
  },
  zh: {
    translation: {
      "app": {
        "title": "VisionFlow"
      },
      "menu": {
        "workflows": "工作流",
        "selfHosted": "自托管"
      },
      "header": {
        "themeLight": "亮色模式",
        "themeDark": "暗色模式",
        "language": "语言"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
