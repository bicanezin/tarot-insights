"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/hooks/useTranslations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslations();

  const getCurrentLanguageName = () => {
    switch (locale) {
      case "en":
        return t("english");
      case "pt":
        return t("portuguese");
      default:
        return t("english");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="text-sm">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")} disabled={locale === "en"} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{t("english")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("pt")} disabled={locale === "pt"} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{t("portuguese")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
