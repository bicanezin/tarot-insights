/// <reference types="react" />

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { spreads as allSpreads } from "@/constants/spreads";
import type { Spread } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { Suspense } from "react";
import { SpreadDisplay } from "@/components/SpreadDisplay";

function ReadingContent() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const categories: Spread["category"][] = ["Yes/No", "Love", "Professional", "Financial"];

  const currentCategory = categoryParam ? categories.find((c) => c.toLowerCase().replace("/", "") === categoryParam) : undefined;

  const spreadsToDisplay = currentCategory ? allSpreads.filter((spread) => spread.category === currentCategory) : allSpreads;

  let pageTitle: string;
  if (currentCategory) {
    const categoryTitleKey = `category${currentCategory.replace("/", "")}` as TranslationKeys;
    const translatedCategory = t(categoryTitleKey);
    pageTitle = `${translatedCategory} - ${t("selectSpread")}`;
  } else {
    pageTitle = t("selectSpread");
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-serif-display">{pageTitle}</h1>
      </div>

      {!currentCategory && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const categoryButtonKey = `category${cat.replace("/", "")}` as TranslationKeys;
            return (
              <Link href={`/reading?category=${cat.toLowerCase().replace("/", "")}`} key={cat} passHref>
                <Button variant={currentCategory === cat ? "default" : "outline"} className="w-full">
                  {t(categoryButtonKey)}
                </Button>
              </Link>
            );
          })}
        </div>
      )}

      <Suspense fallback={<div>Loading spreads...</div>}>
        <SpreadDisplay spreadsToDisplay={spreadsToDisplay} t={t} />
      </Suspense>

      {spreadsToDisplay.length === 0 && <p className="text-center ">{t("noReadingsFound")} for this category.</p>}
    </div>
  );
}

export default function SelectSpreadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReadingContent />
    </Suspense>
  );
}
