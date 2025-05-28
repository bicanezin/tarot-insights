
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { spreads as allSpreads } from '@/constants/spreads';
import type { Spread } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';
import type { TranslationKeys } from '@/hooks/useTranslations'; // Import TranslationKeys
import { ArrowRight, BookMarked } from 'lucide-react';

export default function SelectSpreadPage() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const categories: Spread['category'][] = ['Yes/No', 'Love', 'Professional', 'Financial'];
  
  const currentCategory = categoryParam ? 
    categories.find(c => c.toLowerCase().replace('/', '') === categoryParam) 
    : undefined;

  const spreadsToDisplay = currentCategory 
    ? allSpreads.filter(spread => spread.category === currentCategory)
    : allSpreads;
  
  const pageTitle = currentCategory ? `${t(\`category\${currentCategory.replace('/', '')}\` as any)} ${t('selectSpread')}` : t('selectSpread');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-serif-display">{pageTitle}</h1>
      </div>
      
      {!currentCategory && (
         <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link href={`/reading?category=${cat.toLowerCase().replace('/', '')}`} key={cat} passHref>
              <Button variant={currentCategory === cat ? "default" : "outline"} className="w-full">
                {t(\`category\${cat.replace('/', '')}\` as any)}
              </Button>
            </Link>
          ))}
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spreadsToDisplay.map((spread) => (
          <Card key={spread.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl">{t(spread.name as TranslationKeys)}</CardTitle>
              <CardDescription>{spread.cardCount} {spread.cardCount === 1 ? t('card') : t('card', {count: spread.cardCount})} - {t(\`category\${spread.category.replace('/', '')}\` as any)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {spread.positions.map(pKey => t(pKey as TranslationKeys)).join(', ')}
              </p>
              <Link href={`/reading/${spread.id}`} passHref>
                <Button className="w-full mt-auto">
                  {t('startReading')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {spreadsToDisplay.length === 0 && (
        <p className="text-center text-muted-foreground">{t('noReadingsFound')} for this category.</p>
      )}
    </div>
  );
}
