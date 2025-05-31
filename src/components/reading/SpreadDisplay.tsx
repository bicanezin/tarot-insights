"use client";

import type { Spread, TarotCard, DrawnCard } from "@/types";
import { TarotCardImage, CardBack } from "@/components/shared/TarotCardImage";
import { DrawnCardView } from "./DrawnCardView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLayoutConfig, CardPositionStyle } from "@/constants/spreadLayouts";
import { useTranslations } from "@/hooks/useTranslations";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { ArrowDownUp, Shuffle } from "lucide-react";

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

  const spreadCategoryKey = `category${spread.category.replace("/", "")}` as TranslationKeys;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-serif-display text-2xl">{t(spread.name as TranslationKeys)}</CardTitle>
        <CardDescription>
          {spread.cardCount} {t("card", { count: spread.cardCount })} - {t(spreadCategoryKey)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {canDrawAll && (
          <Button onClick={onShuffleAndDrawAll} className="w-full md:w-auto">
            <Shuffle className="mr-2 h-4 w-4" /> {t("drawCards")} ({t("shuffle")})
          </Button>
        )}

        <div className={cn("transition-all duration-500 ease-in-out", layoutConfig.containerClassName)}>
          {spread.positions.map((positionNameKey, index) => {
            const drawnCardData = getCardForPosition(index);
            const positionStyle = layoutConfig.cardPositions[index] || {};

            return (
              <div
                key={index}
                style={{ gridArea: positionStyle.gridArea, ...positionStyle.style }}
                className={cn(
                  "flex flex-col items-center justify-start space-y-0.5 p-1 sm:p-1.5 rounded-lg", // Reduced space-y and padding
                  isDrawingMode && drawingForPosition === index && "ring-2 ring-primary shadow-lg bg-primary/10",
                  !drawnCardData && isDrawingMode && "cursor-pointer hover:bg-accent/20",
                  "min-h-[180px] sm:min-h-[240px] md:min-h-[280px]" // Reduced min-height values
                )}
                onClick={() => !drawnCardData && isDrawingMode && onSelectPositionToDraw(index)}
              >
                <p className="text-xs text-center font-semibold text-muted-foreground h-8 flex-shrink-0 px-1">
                  {index + 1}. {t(positionNameKey as TranslationKeys)}
                </p>
                {drawnCardData ? (
                  <div className="w-full max-w-xs mx-auto">
                    {/* Container for DrawnCardView */}
                    <DrawnCardView drawnCardData={drawnCardData} positionName={positionNameKey} />
                  </div>
                ) : (
                  // This container controls the CardBack size and aspect ratio
                  <div className="w-3/4 max-w-[120px] sm:max-w-[140px] md:max-w-[150px] mx-auto mt-2">
                    <CardBack
                      className={cn(
                        "w-full aspect-[3/5]", // CardBack will fill this and maintain aspect ratio
                        isDrawingMode && drawingForPosition === index ? "ring-2 ring-offset-2 ring-primary" : "",
                        isDrawingMode && !(drawingForPosition === index) ? "opacity-50" : ""
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
              {t("pickACardFor", { positionName: t(spread.positions[drawingForPosition] as TranslationKeys) })}
            </h3>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted p-2">
              <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-2 sm:gap-3 min-w-max">
                {availableDeck.map((card, i) => (
                  <div
                    key={card.id}
                    onClick={() => onPickCardFromDeck(card)}
                    className="cursor-pointer"
                    style={{
                      gridRow: i < 39 ? 1 : 2,
                      gridColumn: `${(i % 39) + 1}`,
                    }}
                  >
                    <div className="w-24 h-40 sm:w-28 sm:h-[186px] relative">
                      <TarotCardImage
                        cardName={t(card.name as TranslationKeys)}
                        imageNameHint={card.imageName}
                        imageUrl={card.imageUrl}
                        isReversed={false}
                        width={100}
                        height={166}
                        className="w-full h-full hover:ring-2 hover:ring-primary transition-all duration-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">{t("cardDescription")}</p>
          </Card>
        )}

        {drawnCards.length === spread.cardCount && !isDrawingMode && (
          <p className="text-center text-sm text-green-600 dark:text-green-400 font-semibold p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
            {t("allCardsDrawn")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
