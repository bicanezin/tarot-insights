
"use client";

import type { DrawnCard, TarotCard } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { TarotCardImage } from '@/components/shared/TarotCardImage';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { TranslationKeys } from '@/hooks/useTranslations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

interface DrawnCardViewProps {
  drawnCardData: DrawnCard;
  positionName: string; // This will now be a translation key
  showFullDetails?: boolean; 
}

export function DrawnCardView({ drawnCardData, positionName, showFullDetails = false }: DrawnCardViewProps) {
  const { card, isReversed: initiallyReversed } = drawnCardData;
  const [isReversedDisplay, setIsReversedDisplay] = useState(initiallyReversed);
  const { t } = useTranslations();

  const toggleReversed = () => {
    setIsReversedDisplay(!isReversedDisplay);
  };
  
  const translatedCardName = t(card.name as TranslationKeys);
  const translatedMeaningUp = t(card.meaning_up as TranslationKeys);
  const translatedMeaningRev = t(card.meaning_rev as TranslationKeys);
  const translatedDesc = t(card.desc as TranslationKeys);

  const currentMeaning = isReversedDisplay ? translatedMeaningRev : translatedMeaningUp;
  const currentOrientationKey = isReversedDisplay ? 'reversed' : 'upright';

  let translatedYesNo = '';
  if (card.yesNo === 'Yes') {
    translatedYesNo = t('textYes');
  } else if (card.yesNo === 'No') {
    translatedYesNo = t('textNo');
  } else if (card.yesNo === 'Maybe') {
    translatedYesNo = t('textMaybe');
  }


  return (
    <Card className="w-full overflow-hidden flex flex-col h-full">
      <CardHeader className="p-3 sm:p-4">
        <UiCardDescription className="text-xs sm:text-sm text-muted-foreground truncate">{t(positionName as TranslationKeys)}</UiCardDescription>
        <CardTitle className="font-serif-display text-base sm:text-lg md:text-xl">{translatedCardName}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 flex-grow flex flex-col">
        <div className="flex justify-center items-center">
           {/* This container controls the image width; TarotCardImage will fill it */}
          <div className="w-3/4 max-w-[120px] sm:max-w-[140px] md:max-w-[150px] mx-auto">
            <TarotCardImage 
              cardName={translatedCardName} 
              imageNameHint={card.imageName} 
              imageUrl={card.imageUrl} 
              isReversed={isReversedDisplay} 
              width={150} // For placeholder generation and Next/Image aspect ratio
              height={250}
              className="w-full aspect-[3/5]" // Makes the TarotCardImage div have this aspect ratio
            />
          </div>
        </div>
        
        <Tabs defaultValue={currentOrientationKey} className="w-full text-xs sm:text-sm">
          <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="upright" onClick={() => setIsReversedDisplay(false)}>{t('upright')}</TabsTrigger>
            <TabsTrigger value="reversed" onClick={() => setIsReversedDisplay(true)}>{t('reversed')}</TabsTrigger>
          </TabsList>
          <TabsContent value="upright">
            <div className="mt-2 p-2 sm:p-3 border rounded-md bg-background min-h-[80px] sm:min-h-[100px]">
              <h4 className="font-semibold text-xs sm:text-sm mb-1">{t('meaning')} ({t('upright')})</h4>
              <ScrollArea className="h-[50px] sm:h-[70px]">
                <p className="text-xs text-foreground/80">{translatedMeaningUp}</p>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="reversed">
             <div className="mt-2 p-2 sm:p-3 border rounded-md bg-background min-h-[80px] sm:min-h-[100px]">
              <h4 className="font-semibold text-xs sm:text-sm mb-1">{t('meaning')} ({t('reversed')})</h4>
              <ScrollArea className="h-[50px] sm:h-[70px]">
                <p className="text-xs text-foreground/80">{translatedMeaningRev}</p>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        {showFullDetails && (
          <>
            <div className="mt-2 p-2 sm:p-3 border rounded-md bg-background">
                <h4 className="font-semibold text-xs sm:text-sm mb-1">{t('cardDescription')}</h4>
                 <ScrollArea className="h-[40px] sm:h-[60px]">
                  <p className="text-xs text-foreground/80">{translatedDesc}</p>
                </ScrollArea>
            </div>
            {card.yesNo && (
              <p className="text-xs sm:text-sm text-center"><strong>{t('yesNoLabel')}:</strong> {translatedYesNo}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
