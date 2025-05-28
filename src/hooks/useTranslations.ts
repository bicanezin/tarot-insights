
"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { t as translateFunction } from '@/lib/i18n';
import en from '@/locales/en.json'; // Import to get keys

// Explicitly type TranslationKeys based on the structure of en.json
export type TranslationKeys = keyof typeof en;

export const useTranslations = () => {
  const { locale } = useLanguage();

  // Ensure the key passed is one of the TranslationKeys
  const t = (key: TranslationKeys, params?: Record<string, string | number>): string => {
    return translateFunction(locale, key, params);
  };

  return { t, locale };
};
