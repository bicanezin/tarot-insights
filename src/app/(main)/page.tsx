"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { Heart, Briefcase, TrendingUp, HelpCircle, Sparkles } from "lucide-react";
import type { Spread } from "@/types";
import { spreads as allSpreads } from "@/constants/spreads";
import { motion } from "framer-motion";

const categoryIcons: Record<Spread["category"], React.ElementType> = {
  "Yes/No": HelpCircle,
  Love: Heart,
  Professional: Briefcase,
  Financial: TrendingUp,
};

const MotionCard = motion(Card);
const MotionSparkles = motion(Sparkles);

export default function HomePage() {
  const { t } = useTranslations();
  const categories: Spread["category"][] = ["Yes/No", "Love", "Professional", "Financial"];

  return (
    <div className="min-h-[80vh] relative flex flex-col items-center justify-center py-12 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.08),transparent_50%)]" />

      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif-display flex items-center justify-center gap-3">
          <MotionSparkles
            className="h-8 w-8 md:h-10 md:w-10 text-accent"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {t("appName")}
          <MotionSparkles
            className="h-8 w-8 md:h-10 md:w-10 text-accent"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">{t("selectCategory")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category];
          const categorySpreads = allSpreads.filter((s) => s.category === category);
          const categoryTitleKey = `category${category.replace("/", "")}` as TranslationKeys;
          const spreadsCount = categorySpreads.length;
          const spreadsAvailableTextKey = spreadsCount === 1 ? "spreadsAvailable_one" : "spreadsAvailable_many";
          const spreadsAvailableText = t(spreadsAvailableTextKey as TranslationKeys, { count: spreadsCount });

          return (
            <MotionCard
              key={category}
              className="group relative overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 group-hover:to-accent/10 transition-all duration-300" />

              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-serif-display">{t(categoryTitleKey)}</CardTitle>
                <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-full bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </motion.div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <CardDescription className="text-sm">{spreadsAvailableText}</CardDescription>
                <Link href={`/reading?category=${category.toLowerCase().replace("/", "")}`} passHref className="block">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                    {t("selectSpread")}
                  </Button>
                </Link>
              </CardContent>
            </MotionCard>
          );
        })}
      </div>
    </div>
  );
}
