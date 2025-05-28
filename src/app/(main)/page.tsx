
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { Heart, Briefcase, TrendingUp, HelpCircle, Sparkles } from 'lucide-react'; // Added Sparkles
import type { Spread } from '@/types';
import { spreads as allSpreads } from '@/constants/spreads'; // Ensure this path is correct

const categoryIcons: Record<Spread['category'], React.ElementType> = {
  'Yes/No': HelpCircle,
  'Love': Heart,
  'Professional': Briefcase,
  'Financial': TrendingUp,
};

export default function HomePage() {
  const { t } = useTranslations();

  const categories: Spread['category'][] = ['Yes/No', 'Love', 'Professional', 'Financial'];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight font-serif-display flex items-center justify-center gap-2">
          <Sparkles className="h-10 w-10 text-primary" /> {t('appName')} <Sparkles className="h-10 w-10 text-primary" />
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('selectCategory')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const categorySpreads = allSpreads.filter(s => s.category === category);
          return (
            <Card key={category} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-serif-display font-medium">{t(`category${category.replace('/', '')}` as any)}</CardTitle>
                <Icon className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {categorySpreads.length} {categorySpreads.length === 1 ? "spread" : "spreads"} available.
                </CardDescription>
                <Link href={`/reading?category=${category.toLowerCase().replace('/', '')}`} passHref>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {t('selectSpread')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
