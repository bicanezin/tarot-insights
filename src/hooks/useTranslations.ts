
"use client";

import { useCallback } from 'react'; // Added useCallback
import { useLanguage } from '@/contexts/LanguageContext';
import { t as translateFunction } from '@/lib/i18n';
import type en from '@/locales/en.json'; // Import to get keys

// Explicitly type TranslationKeys based on the structure of en.json
export type TranslationKeys = keyof typeof en;

export const useTranslations = () => {
  const { locale } = useLanguage();

  // Memoize t function, it will only change if locale changes
  const t = useCallback((key: TranslationKeys, params?: Record<string, string | number>): string => {
    return translateFunction(locale, key, params);
  }, [locale]);

  return { t, locale };
};
