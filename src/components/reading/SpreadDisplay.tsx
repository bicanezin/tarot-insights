
"use client";

import type { Spread, TarotCard, DrawnCard } from '@/types';
import { TarotCardImage, CardBack } from '@/components/shared/TarotCardImage';
import { DrawnCardView } from './DrawnCardView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getLayoutConfig, CardPositionStyle } from '@/constants/spreadLayouts';
import { useTranslations } from '@/hooks/useTranslations';
import { ArrowDownUp, Shuffle } from 'lucide-react';

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
  onCardDraw, // This might be deprecated if we move to pick-from-deck model fully
  onShuffleAndDrawAll,
  isDrawingMode,
  drawingForPosition,
  onSelectPositionToDraw,
  availableDeck,
  onPickCardFromDeck,
  canDrawAll
}: SpreadDisplayProps) {
  const { t } = useTranslations();
  const layoutConfig = getLayoutConfig(spread.layoutType, spread.cardCount);

  const getCardForPosition = (index: number): DrawnCard | undefined => {
    return drawnCards.find(dc => dc.positionName === spread.positions[index]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-serif-display text-2xl">{t(spread.name as any) || spread.name}</CardTitle>
        <CardDescription>
          {spread.cardCount} {t('card', {count: spread.cardCount})} - {t(`category${spread.category.replace('/', '')}` as any)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {canDrawAll && (
          <Button onClick={onShuffleAndDrawAll} className="w-full md:w-auto">
            <Shuffle className="mr-2 h-4 w-4" /> {t('drawCards')} ({t('shuffle')})
          </Button>
        )}

        <div className={cn("transition-all duration-500 ease-in-out", layoutConfig.containerClassName)}>
          {spread.positions.map((positionName, index) => {
            const drawnCardData = getCardForPosition(index);
            const positionStyle = layoutConfig.cardPositions[index] || {};
            
            return (
              <div
                key={index}
                style={{ gridArea: positionStyle.gridArea, ...positionStyle.style }}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 p-2 rounded-lg",
                  isDrawingMode && drawingForPosition === index && "ring-2 ring-primary shadow-lg bg-primary/10",
                  !drawnCardData && isDrawingMode && "cursor-pointer hover:bg-accent/20",
                  "min-h-[280px] md:min-h-[320px]" // Ensure placeholders have height
                )}
                onClick={() => !drawnCardData && isDrawingMode && onSelectPositionToDraw(index)}
              >
                <p className="text-xs text-center font-semibold text-muted-foreground h-8">
                  {index + 1}. {t(positionName as any) || positionName}
                </p>
                {drawnCardData ? (
                  <DrawnCardView drawnCardData={drawnCardData} positionName={t(positionName as any) || positionName} />
                ) : (
                  <div className="w-[120px] h-[200px] md:w-[150px] md:h-[250px]">
                     <CardBack 
                        className={cn(
                            isDrawingMode && drawingForPosition === index ? "animate-pulse ring-2 ring-offset-2 ring-primary" : "",
                            isDrawingMode && ! (drawingForPosition === index) ? "opacity-50" : ""
                        )} 
                     />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {isDrawingMode && drawingForPosition !== null && (
          <Card className="mt-6 p-4 bg-muted/50">
            <h3 className="text-lg font-semibold mb-2 text-center">
              {t('pickACardFor', { positionName: t(spread.positions[drawingForPosition] as any) || spread.positions[drawingForPosition] })}
            </h3>
            <div className="flex flex-nowrap overflow-x-auto gap-3 p-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted">
              {availableDeck.map((card) => (
                <div key={card.id} onClick={() => onPickCardFromDeck(card)} className="cursor-pointer flex-shrink-0">
                  <TarotCardImage cardName={card.name} imageNameHint={card.imageName} isReversed={false} width={100} height={166} className="hover:ring-2 hover:ring-primary"/>
                </div>
              ))}
            </div>
             <p className="text-xs text-muted-foreground text-center mt-2">{t('cardDescription')}</p>
          </Card>
        )}

        {drawnCards.length === spread.cardCount && !isDrawingMode && (
            <p className="text-center text-sm text-green-600 dark:text-green-400 font-semibold p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
                {t('allCardsDrawn')}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
