
"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { t as translateFunction } from '@/lib/i18n';
import en from '@/locales/en.json'; // Import to get keys

type TranslationKeys = keyof typeof en;

export const useTranslations = () => {
  const { locale } = useLanguage();

  const t = (key: TranslationKeys, params?: Record<string, string | number>): string => {
    return translateFunction(locale, key, params);
  };

  return { t, locale };
};
