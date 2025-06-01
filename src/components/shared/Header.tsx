"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "@/hooks/useTranslations";
import { BookOpenText, History, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const { t } = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
          <span className="font-bold font-serif-display text-lg">{t("appName")}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
            <Home size={16} /> {t("navHome")}
          </Link>
          <Link href="/reading" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
            <BookOpenText size={16} /> {t("navNewReading")}
          </Link>
          <Link href="/history" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
            <History size={16} /> {t("navHistory")}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
