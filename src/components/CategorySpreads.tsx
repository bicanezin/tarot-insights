import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Spread } from '@/types';
import type { TranslationKeys } from '@/hooks/useTranslations';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionSparkles = motion(Sparkles);

export function CategorySpreads({
  spreads,
  t,
}: {
  spreads: Spread[];
  t: (key: TranslationKeys, options?: any) => string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spreads.map((spread, index) => {
        return (
          <MotionCard
            key={spread.id}
            className="flex flex-col hover:shadow-lg transition-shadow relative overflow-hidden group bg-card/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 group-hover:to-accent/10 transition-all duration-300" />
            <div className="absolute inset-0 bg-grid-white pointer-events-none" />

            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-full bg-accent/10 backdrop-blur-sm">
                  <MotionSparkles
                    className="h-4 w-4 text-accent"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
                <CardTitle className="font-serif-display text-xl">{t(spread.name as TranslationKeys)}</CardTitle>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                  {spread.cardCount} {spread.cardCount === 1 ? t('card') : t('card', { count: spread.cardCount })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between relative">
              <div className="absolute right-0 top-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:bg-accent/10 transition-colors duration-300" />
              <div className="absolute left-0 bottom-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl transform -translate-x-16 translate-y-16 group-hover:bg-accent/10 transition-colors duration-300" />

              <p className="text-sm  mb-4 line-clamp-2 relative">
                {spread.positions.map((pKey) => t(pKey as TranslationKeys)).join(', ')}
              </p>
              <Link href={`/reading/${spread.id}`} passHref>
                <Button className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/button">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t('startReading')}{' '}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
            </CardContent>
          </MotionCard>
        );
      })}
    </div>
  );
}
