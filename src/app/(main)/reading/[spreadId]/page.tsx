"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserInfoForm } from "@/components/reading/UserInfoForm";
import { SpreadDisplay } from "@/components/reading/SpreadDisplay";
import { AIInterpretation } from "@/components/reading/AIInterpretation";
import { getSpreadById } from "@/constants/spreads";
import { fullTarotDeck } from "@/constants/tarotDeck";
import type { Spread as SpreadType, TarotCard, DrawnCard, SavedReading } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTranslations } from "@/hooks/useTranslations";
import type { TranslationKeys } from "@/hooks/useTranslations";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Fisher-Yates shuffle algorithm
function shuffleDeck(deck: TarotCard[]): TarotCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslations();
  const spreadId = params.spreadId as string;

  const [spread, setSpread] = useState<SpreadType | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [readingDate, setReadingDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [customDetails, setCustomDetails] = useState<string>("");

  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [currentDeck, setCurrentDeck] = useState<TarotCard[]>([]);
  const [aiInterpretation, setAiInterpretation] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false); // True when user needs to pick cards
  const [drawingForPosition, setDrawingForPosition] = useState<number | null>(null); // Index of position being drawn for

  const [savedReadings, setSavedReadings] = useLocalStorage<SavedReading[]>("tarotReadings", []);

  useEffect(() => {
    const currentSpread = getSpreadById(spreadId);
    if (currentSpread) {
      setSpread(currentSpread);
      // Make sure we have all cards from 0 to 78 in the deck
      const allCards = fullTarotDeck.sort((a, b) => a.id - b.id);
      setCurrentDeck(shuffleDeck(allCards));
      setIsDrawingMode(true);
      setDrawnCards([]);
      setAiInterpretation("");
      setDrawingForPosition(0);
    } else {
      toast({ title: t("errorSpreadNotFound" as TranslationKeys), variant: "destructive" });
      router.push("/reading");
    }
    setIsLoading(false);
  }, [spreadId, router, toast, t]);

  const handleSelectPositionToDraw = (positionIndex: number) => {
    if (drawnCards.find((dc) => dc.positionName === spread?.positions[positionIndex])) {
      return;
    }
    setDrawingForPosition(positionIndex);
  };

  const handlePickCardFromDeck = (selectedCard: TarotCard) => {
    if (!spread || drawingForPosition === null) return;

    const isReversed = Math.random() < 0.5;
    const positionNameKey = spread.positions[drawingForPosition];

    const newDrawnCard: DrawnCard = {
      card: selectedCard,
      isReversed,
      positionName: positionNameKey,
    };

    setDrawnCards((prev) => [...prev, newDrawnCard]);
    setCurrentDeck((prev) => prev.filter((card) => card.id !== selectedCard.id));

    if (drawnCards.length + 1 < spread.cardCount) {
      let nextPos = (drawingForPosition + 1) % spread.cardCount;
      while (
        drawnCards.some((dc) => dc.positionName === spread.positions[nextPos]) ||
        (nextPos === drawingForPosition && drawnCards.length + 1 < spread.cardCount)
      ) {
        nextPos = (nextPos + 1) % spread.cardCount;
        if (nextPos === drawingForPosition && drawnCards.some((dc) => dc.positionName === spread.positions[nextPos])) break;
      }
      if (drawnCards.length + 1 < spread.cardCount && !drawnCards.some((dc) => dc.positionName === spread.positions[nextPos])) {
        setDrawingForPosition(nextPos);
      } else {
        const firstAvailable = spread.positions.findIndex(
          (pKey, idx) => !drawnCards.some((dc) => dc.positionName === pKey) && idx !== drawingForPosition
        );
        if (firstAvailable !== -1) {
          setDrawingForPosition(firstAvailable);
        } else {
          setDrawingForPosition(null);
          setIsDrawingMode(false);
        }
      }
    } else {
      setDrawingForPosition(null);
      setIsDrawingMode(false);
    }
  };

  const handleShuffleAndDrawAll = useCallback(() => {
    if (!spread) return;
    const shuffled = shuffleDeck(fullTarotDeck);
    const newDrawn: DrawnCard[] = [];
    const deckCopy = [...shuffled];

    for (let i = 0; i < spread.cardCount; i++) {
      if (deckCopy.length === 0) break;
      const card = deckCopy.pop()!;
      newDrawn.push({
        card,
        isReversed: Math.random() < 0.5,
        positionName: spread.positions[i],
      });
    }
    setDrawnCards(newDrawn);
    setCurrentDeck(deckCopy);
    setIsDrawingMode(false);
    setDrawingForPosition(null);
  }, [spread]);

  const handleSaveReading = () => {
    if (!spread || !userName || !readingDate) {
      toast({
        title: t("errorSavingReading" as TranslationKeys),
        description: t("errorSavingReadingDescription" as TranslationKeys),
        variant: "destructive",
      });
      return;
    }
    if (drawnCards.length < spread.cardCount) {
      toast({
        title: t("errorIncompleteReading" as TranslationKeys),
        description: t("errorIncompleteReadingDescription" as TranslationKeys),
        variant: "destructive",
      });
      return;
    }

    const newReading: SavedReading = {
      id: new Date().toISOString(),
      userName,
      readingDate,
      customDetails,
      spread,
      drawnCards,
      aiInterpretation,
      timestamp: Date.now(),
    };
    setSavedReadings((prev) => [...prev, newReading]);
    toast({ title: t("readingSaved") });
  };

  if (isLoading || !spread) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const canDrawAllCards = drawnCards.length === 0 && isDrawingMode;

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t("selectSpread")}
      </Button>

      <h1 className="text-3xl font-bold tracking-tight text-center font-serif-display">{t(spread.name as TranslationKeys)}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SpreadDisplay
            spread={spread}
            drawnCards={drawnCards}
            onCardDraw={() => {}}
            onShuffleAndDrawAll={handleShuffleAndDrawAll}
            isDrawingMode={isDrawingMode}
            drawingForPosition={drawingForPosition}
            onSelectPositionToDraw={handleSelectPositionToDraw}
            availableDeck={currentDeck}
            onPickCardFromDeck={handlePickCardFromDeck}
            canDrawAll={canDrawAllCards}
          />
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 font-serif-display">{t("readingSetup")}</h2>
            <UserInfoForm
              userName={userName}
              setUserName={setUserName}
              readingDate={readingDate}
              setReadingDate={setReadingDate}
              customDetails={customDetails}
              setCustomDetails={setCustomDetails}
            />
          </div>

          <Separator />

          <AIInterpretation
            spread={spread}
            drawnCards={drawnCards}
            userName={userName}
            readingDate={readingDate}
            customDetails={customDetails}
            onInterpretationGenerated={setAiInterpretation}
            initialInterpretation={aiInterpretation}
          />

          {drawnCards.length === spread.cardCount && (
            <Button onClick={handleSaveReading} className="w-full" size="lg">
              <Save className="mr-2 h-4 w-4" /> {t("saveReading")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
