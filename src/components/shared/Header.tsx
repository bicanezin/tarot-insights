
"use client";

import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';
import { BookOpenText, History, Home } from 'lucide-react';

export function Header() {
  const { t } = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0 3.5c-2.8 0-5.21 1.7-6.32 4.09.14.06.28.1.42.1h11.8c.14 0 .28-.04.42-.1C17.21 15.7 14.8 14 12 14z" opacity=".3"/>
            <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6.32 4.09C6.79 17.39 9.06 16 12 16s5.21 1.39 6.32 2.09C17.28 18.04 17.14 18 17 18H7c-.14 0-.28.04-.42.09zM12 5c-1.93 0-3.5 1.57-3.5 3.5S10.07 12 12 12s3.5-1.57 3.5-3.5S13.93 5 12 5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5S12.83 10 12 10z"/>
          </svg>
          <span className="font-bold font-serif-display text-lg">{t('appName')}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
            <Home size={16} /> {t('navHome')}
          </Link>
          <Link href="/reading" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
             <BookOpenText size={16}/> {t('navNewReading')}
          </Link>
          <Link href="/history" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
            <History size={16} /> {t('navHistory')}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
