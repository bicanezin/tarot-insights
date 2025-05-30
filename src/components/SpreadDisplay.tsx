"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Spread } from "@/types";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { ArrowRight } from "lucide-react";

export function SpreadDisplay({ spreadsToDisplay, t }: { spreadsToDisplay: Spread[]; t: (key: TranslationKeys, options?: any) => string }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spreadsToDisplay.map((spread) => {
          const spreadCategoryKey = `category${spread.category.replace("/", "")}` as TranslationKeys;
          return (
            <Card key={spread.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl">{t(spread.name as TranslationKeys)}</CardTitle>
                <CardDescription>
                  {spread.cardCount} {spread.cardCount === 1 ? t("card") : t("card", { count: spread.cardCount })} - {t(spreadCategoryKey)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {spread.positions.map((pKey) => t(pKey as TranslationKeys)).join(", ")}
                </p>
                <Link href={`/reading/${spread.id}`} passHref>
                  <Button className="w-full mt-auto">
                    {t("startReading")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
