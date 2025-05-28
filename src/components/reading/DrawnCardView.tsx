
"use client";

import type { DrawnCard, TarotCard } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { TarotCardImage } from '@/components/shared/TarotCardImage';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

interface DrawnCardViewProps {
  drawnCardData: DrawnCard;
  positionName: string;
  showFullDetails?: boolean; // To control if meanings are initially expanded
}

export function DrawnCardView({ drawnCardData, positionName, showFullDetails = false }: DrawnCardViewProps) {
  const { card, isReversed: initiallyReversed } = drawnCardData;
  const [isReversedDisplay, setIsReversedDisplay] = useState(initiallyReversed);
  const { t } = useTranslations();

  const toggleReversed = () => {
    setIsReversedDisplay(!isReversedDisplay);
  };
  
  const currentMeaning = isReversedDisplay ? card.meaning_rev : card.meaning_up;
  const currentOrientationKey = isReversedDisplay ? 'reversed' : 'upright';

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4">
        <UiCardDescription className="text-sm text-muted-foreground">{positionName}</UiCardDescription>
        <CardTitle className="font-serif-display text-xl">{card.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-center items-center">
          <TarotCardImage cardName={card.name} imageNameHint={card.imageName} isReversed={isReversedDisplay} width={120} height={200}/>
        </div>
        
        <Tabs defaultValue={currentOrientationKey} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upright" onClick={() => setIsReversedDisplay(false)}>{t('upright')}</TabsTrigger>
            <TabsTrigger value="reversed" onClick={() => setIsReversedDisplay(true)}>{t('reversed')}</TabsTrigger>
          </TabsList>
          <TabsContent value="upright">
            <div className="mt-2 p-3 border rounded-md bg-background min-h-[100px]">
              <h4 className="font-semibold text-sm mb-1">{t('meaning')} ({t('upright')})</h4>
              <ScrollArea className="h-[80px]">
                <p className="text-xs text-foreground/80">{card.meaning_up}</p>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="reversed">
             <div className="mt-2 p-3 border rounded-md bg-background min-h-[100px]">
              <h4 className="font-semibold text-sm mb-1">{t('meaning')} ({t('reversed')})</h4>
              <ScrollArea className="h-[80px]">
                <p className="text-xs text-foreground/80">{card.meaning_rev}</p>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        {showFullDetails && (
          <>
            <div className="mt-2 p-3 border rounded-md bg-background">
                <h4 className="font-semibold text-sm mb-1">{t('cardDescription')}</h4>
                 <ScrollArea className="h-[60px]">
                  <p className="text-xs text-foreground/80">{card.desc}</p>
                </ScrollArea>
            </div>
            {card.yesNo && (
              <p className="text-sm text-center"><strong>Yes/No:</strong> {card.yesNo}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
