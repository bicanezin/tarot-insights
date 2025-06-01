"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { Heart, Briefcase, TrendingUp, HelpCircle, Sparkles, Star } from "lucide-react";
import type { Spread } from "@/types";
import { spreads as allSpreads } from "@/constants/spreads";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CategorySpreads } from "@/components/CategorySpreads";

const categoryIcons: Record<Spread["category"], React.ElementType> = {
  "Yes/No": HelpCircle,
  Love: Heart,
  Professional: Briefcase,
  Financial: TrendingUp,
};

const MotionCard = motion(Card);
const MotionSparkles = motion(Sparkles);
const MotionStar = motion(Star);

export default function HomePage() {
  const { t } = useTranslations();
  const categories: Spread["category"][] = ["Yes/No", "Love", "Professional", "Financial"];

  return (
    <div className="min-h-[80vh] relative flex flex-col items-center justify-center py-12 px-4">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <MotionStar
            key={i}
            className="absolute text-accent/20"
            style={{
              top: `${15 + i * 20}%`,
              left: `${10 + i * 20}%`,
              width: `${1.5 + i * 0.5}rem`,
              height: `${1.5 + i * 0.5}rem`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-6 mb-12">
        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-4 bg-accent/5 rounded-lg blur-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif-display flex items-center justify-center gap-3 relative">
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
        </div>
        <p className="text-xl md:text-2xl font-light relative">
          {t("selectCategory")}
          <motion.div
            className="absolute inset-0 -z-10 bg-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </p>
      </div>

      <div className="w-full max-w-6xl relative">
        <motion.div
          className="absolute -inset-4 bg-accent/5 rounded-2xl blur-2xl"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Accordion type="single" collapsible className="space-y-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category];
            const categorySpreads = allSpreads.filter((s) => s.category === category);
            const categoryTitleKey = `category${category.replace("/", "")}` as TranslationKeys;
            const spreadsCount = categorySpreads.length;
            const spreadsAvailableTextKey = spreadsCount === 1 ? "spreadsAvailable_one" : "spreadsAvailable_many";
            const spreadsAvailableText = t(spreadsAvailableTextKey as TranslationKeys, { count: spreadsCount });

            return (
              <AccordionItem key={category} value={category} className="border-none">
                <MotionCard
                  className="group relative overflow-hidden bg-card/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 group-hover:to-accent/10 transition-all duration-300" />

                  <AccordionTrigger className="w-full hover:no-underline px-6">
                    <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                      <div className="flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.1 }} className="p-2.5 rounded-full bg-accent/10 backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-accent" />
                        </motion.div>
                        <CardTitle className="text-2xl font-serif-display">{t(categoryTitleKey)}</CardTitle>
                      </div>
                      <p className="text-sm">{spreadsAvailableText}</p>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="pt-4 pb-6">
                      <CategorySpreads spreads={categorySpreads} t={t} />
                    </CardContent>
                  </AccordionContent>
                </MotionCard>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
