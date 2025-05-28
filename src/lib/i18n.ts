import type { Locale } from '@/contexts/LanguageContext';
import en from '@/locales/en.json';
import pt from '@/locales/pt.json';

const translations = {
  en,
  pt,
};

type TranslationKeys = keyof typeof en; // Assuming pt has the same keys

export function getTranslations(locale: Locale) {
  return translations[locale];
}

// Helper function to get a specific translation string
// This is a simplified version. For complex plurals or interpolations, a more robust library might be needed.
export function t(locale: Locale, key: TranslationKeys, params?: Record<string, string | number>): string {
  let translation = translations[locale][key] || translations['en'][key] || key;

  if (params) {
    Object.keys(params).forEach((paramKey) => {
      const regex = new RegExp(`{{${paramKey}}}`, 'g');
      translation = translation.replace(regex, String(params[paramKey]));
    });
  }
  
  return translation;
}
