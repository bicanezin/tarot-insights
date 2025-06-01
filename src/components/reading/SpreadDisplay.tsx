'use client';

import type { Spread, TarotCard, DrawnCard } from '@/types';
import { TarotCardImage, CardBack } from '@/components/shared/TarotCardImage';
import { DrawnCardView } from './DrawnCardView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getLayoutConfig, CardPositionStyle } from '@/constants/spreadLayouts';
import { useTranslations } from '@/hooks/useTranslations';
import type { TranslationKeys } from '@/hooks/useTranslations';
import { ArrowDownUp, Shuffle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

interface SpreadDisplayProps {
  spread: Spread;
  drawnCards: DrawnCard[];
  onCardDraw: (card: TarotCard, isReversed: boolean, positionIndex: number) => void;
  onShuffleAndDrawAll: () => void;
  isDrawingMode: boolean;
  drawingForPosition: number | null;
  onSelectPositionToDraw: (positionIndex: number) => void;
  availableDeck: TarotCard[];
  onPickCardFromDeck: (card: TarotCard) => void;
  canDrawAll: boolean;
}

export function SpreadDisplay({
  spread,
  drawnCards,
  onCardDraw,
  onShuffleAndDrawAll,
  isDrawingMode,
  drawingForPosition,
  onSelectPositionToDraw,
  availableDeck,
  onPickCardFromDeck,
  canDrawAll,
}: SpreadDisplayProps) {
  const { t } = useTranslations();
  const layoutConfig = getLayoutConfig(spread.layoutType, spread.cardCount);

  const getCardForPosition = (index: number): DrawnCard | undefined => {
    return drawnCards.find((dc) => dc.positionName === spread.positions[index]);
  };

  const spreadCategoryKey = `category${spread.category.replace('/', '')}` as TranslationKeys;

  return (
    <MotionCard
      className="w-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5" />

      <CardHeader>
        <CardTitle className="font-serif-display text-2xl md:text-3xl flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          {t(spread.name as TranslationKeys)}
        </CardTitle>
        <CardDescription className="text-base">
          {spread.cardCount} {t('card', { count: spread.cardCount })} - {t(spreadCategoryKey)}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {canDrawAll && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Button
              onClick={onShuffleAndDrawAll}
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Shuffle className="mr-2 h-5 w-5" /> {t('drawCards')} ({t('shuffle')})
            </Button>
          </motion.div>
        )}

        <div className={cn('transition-all duration-500 ease-in-out relative', layoutConfig.containerClassName)}>
          <AnimatePresence>
            {spread.positions.map((positionNameKey, index) => {
              const drawnCardData = getCardForPosition(index);
              const positionStyle = layoutConfig.cardPositions[index] || {};

              return (
                <motion.div
                  key={index}
                  style={{ gridArea: positionStyle.gridArea, ...positionStyle.style }}
                  className={cn(
                    'flex flex-col items-center justify-start space-y-2 p-3 rounded-xl',
                    isDrawingMode && drawingForPosition === index && 'ring-2 ring-accent shadow-lg bg-accent/5',
                    !drawnCardData &&
                      isDrawingMode &&
                      'cursor-pointer hover:bg-accent/10 hover:scale-[1.02] transition-all duration-300',
                    'min-h-[180px] sm:min-h-[240px] md:min-h-[280px]'
                  )}
                  onClick={() => !drawnCardData && isDrawingMode && onSelectPositionToDraw(index)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.p
                    className="text-sm font-medium text-foreground/80 h-8 flex-shrink-0 px-2 py-1 rounded-full bg-accent/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {index + 1}. {t(positionNameKey as TranslationKeys)}
                  </motion.p>

                  <AnimatePresence mode="wait">
                    {drawnCardData ? (
                      <motion.div
                        key="drawn"
                        className="w-full max-w-xs mx-auto"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                      >
                        <DrawnCardView drawnCardData={drawnCardData} positionName={positionNameKey} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        className="w-3/4 max-w-[120px] sm:max-w-[140px] md:max-w-[150px] mx-auto mt-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardBack
                          className={cn(
                            'w-full aspect-[3/5] shadow-lg hover:shadow-xl transition-all duration-300',
                            isDrawingMode && drawingForPosition === index ? 'ring-2 ring-offset-4 ring-accent' : '',
                            isDrawingMode && !(drawingForPosition === index) ? 'opacity-50' : ''
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isDrawingMode && drawingForPosition !== null && (
            <MotionCard
              className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-serif-display mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                {t('pickACardFor', { positionName: t(spread.positions[drawingForPosition] as TranslationKeys) })}
              </h3>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-muted/25 p-4 rounded-lg bg-background/50">
                <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-4 min-w-max">
                  {availableDeck.map((card, i) => (
                    <motion.div
                      key={card.id}
                      onClick={() => onPickCardFromDeck(card)}
                      className="cursor-pointer group"
                      style={{
                        gridRow: i < 39 ? 1 : 2,
                        gridColumn: `${(i % 39) + 1}`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.01 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-24 h-40 sm:w-28 sm:h-[186px] relative">
                        <TarotCardImage
                          cardName={t(card.name as TranslationKeys)}
                          imageNameHint={card.imageName}
                          imageUrl={card.imageUrl}
                          isReversed={false}
                          width={100}
                          height={166}
                          className="w-full h-full shadow-lg group-hover:shadow-xl group-hover:ring-2 group-hover:ring-accent transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MotionCard>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {drawnCards.length === spread.cardCount && !isDrawingMode && (
            <motion.p
              className="text-center text-sm text-accent font-medium p-4 bg-accent/10 rounded-lg border border-accent/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {t('allCardsDrawn')}
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </MotionCard>
  );
}
