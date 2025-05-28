
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Wand2 } from 'lucide-react';
import { generateTarotReadingInterpretation, TarotReadingInput } from '@/ai/flows/ai-reading-assistant';
import type { Spread as SpreadType, DrawnCard as DrawnCardType } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';
import type { TranslationKeys } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';


interface AIInterpretationProps {
  spread: SpreadType; // spread.name and spread.positions are now keys
  drawnCards: DrawnCardType[]; // drawnCard.positionName is now a key
  userName: string;
  readingDate: string;
  customDetails: string;
  onInterpretationGenerated: (interpretation: string) => void;
  initialInterpretation?: string;
}

export function AIInterpretation({
  spread,
  drawnCards,
  userName,
  readingDate,
  customDetails,
  onInterpretationGenerated,
  initialInterpretation = ''
}: AIInterpretationProps) {
  const [interpretation, setInterpretation] = useState<string>(initialInterpretation);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslations(); // t function is available here
  const { toast } = useToast();
  const { locale } = useLanguage();


  const handleGenerateInterpretation = async () => {
    if (drawnCards.length < spread.cardCount) {
        toast({ title: "Incomplete Spread", description: "Please draw all cards for the spread before generating an interpretation.", variant: "destructive" });
        return;
    }
    if (!userName || !readingDate) {
        toast({ title: "Missing Information", description: "Please provide a name and date for the reading.", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    setInterpretation('');

    // Translate spread name and positions before sending to AI
    const translatedSpreadName = t(spread.name as TranslationKeys);
    const translatedPositionNames = spread.positions.map(pKey => t(pKey as TranslationKeys));

    const aiInput: TarotReadingInput = {
      spread: {
        id: spread.id,
        name: translatedSpreadName, // Pass translated name
        category: spread.category,
        cardCount: spread.cardCount,
        positions: translatedPositionNames, // Pass translated positions
      },
      drawnCards: drawnCards.map(dc => ({
        card: {
          id: dc.card.id,
          name: dc.card.name, // Card name is already a display string
          meaning_up: dc.card.meaning_up,
          meaning_rev: dc.card.meaning_rev,
          desc: dc.card.desc,
          yesNo: dc.card.yesNo,
        },
        isReversed: dc.isReversed,
        // Note: The AI prompt uses @index for position, not the name directly from drawnCards.
        // So, passing translated position names within the spread object is key.
      })),
      userName: userName,
      readingDate: readingDate,
      customDetails: customDetails || undefined,
      language: locale,
    };

    try {
      const result = await generateTarotReadingInterpretation(aiInput);
      setInterpretation(result.interpretation);
      onInterpretationGenerated(result.interpretation);
    } catch (error) {
      console.error("Error generating AI interpretation:", error);
      toast({
        title: t('errorGeneratingInterpretation'),
        description: (error as Error).message || "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          {t('aiInterpretation')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateInterpretation} disabled={isLoading || drawnCards.length < spread.cardCount}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isLoading ? t('generatingInterpretation') : t('getAiInterpretation')}
        </Button>
        {interpretation && (
          <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-muted/30">
            <pre className="text-sm whitespace-pre-wrap break-words font-sans">{interpretation}</pre>
          </ScrollArea>
        )}
        {!interpretation && isLoading && (
          <div className="h-[200px] w-full rounded-md border p-4 flex items-center justify-center bg-muted/30">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
         {!interpretation && !isLoading && drawnCards.length >= spread.cardCount && (
          <div className="h-[200px] w-full rounded-md border p-4 flex items-center justify-center bg-muted/30">
            <p className="text-muted-foreground">{t('getAiInterpretation')} {t('customDetails')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
