
"use client";

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SavedReading } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DrawnCardView } from '@/components/reading/DrawnCardView';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useTranslations } from '@/hooks/useTranslations';
import type { TranslationKeys } from '@/hooks/useTranslations';
import { Trash2, Eye, DownloadCloud } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function HistoryPage() {
  const { t } = useTranslations();
  const [savedReadings, setSavedReadings] = useLocalStorage<SavedReading[]>('tarotReadings', []);
  const [selectedReading, setSelectedReading] = useState<SavedReading | null>(null);

  const handleDeleteReading = (id: string) => {
    setSavedReadings(prev => prev.filter(reading => reading.id !== id));
    if (selectedReading?.id === id) {
      setSelectedReading(null);
    }
  };
  
  const sortedReadings = [...savedReadings].sort((a, b) => b.timestamp - a.timestamp);

  const exportReadingToJson = (reading: SavedReading) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(reading, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `tarot-reading-${reading.userName.replace(/\s+/g, '_')}-${new Date(reading.readingDate).toLocaleDateString().replace(/\//g, '-')}.json`;
    link.click();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-center font-serif-display">{t('readingHistory')}</h1>

      {sortedReadings.length === 0 ? (
        <p className="text-center text-muted-foreground">{t('noReadingsFound')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReadings.map((reading) => (
            <Card key={reading.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-serif-display">{t(reading.spread.name as TranslationKeys)}</CardTitle>
                <CardDescription>
                  {reading.userName} - {new Date(reading.readingDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-sm text-muted-foreground mb-4">
                  {reading.drawnCards.length} {t('card', {count: reading.drawnCards.length})}
                </p>
                <div className="space-y-2 mt-auto">
                   <Button onClick={() => setSelectedReading(reading)} variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" /> {t('viewReading')}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" /> {t('deleteReading')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('confirmDeleteReading')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('confirmDeleteReadingDescription' as TranslationKeys, {
                            userName: reading.userName,
                            date: new Date(reading.readingDate).toLocaleDateString()
                          })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteReading(reading.id)}>
                          {t('delete')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedReading && (
        <AlertDialog open={!!selectedReading} onOpenChange={(open) => !open && setSelectedReading(null)}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif-display text-2xl">{t('readingDetails')}</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedReading.userName} - {new Date(selectedReading.readingDate).toLocaleDateString()} <br/>
                {t('spread')}: {t(selectedReading.spread.name as TranslationKeys)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <ScrollArea className="max-h-[calc(80vh-150px)] pr-2">
              <div className="space-y-6 my-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('drawnCardsLabel')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedReading.drawnCards.map((drawnCard, index) => (
                      <DrawnCardView key={index} drawnCardData={drawnCard} positionName={drawnCard.positionName} showFullDetails />
                    ))}
                  </div>
                </div>

                {selectedReading.customDetails && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('customDetails')}</h3>
                    <p className="text-sm p-3 bg-muted/50 rounded-md whitespace-pre-wrap">{selectedReading.customDetails}</p>
                  </div>
                )}
                
                <Separator/>

                {selectedReading.aiInterpretation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('aiInterpretation')}</h3>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-3 bg-muted/30">
                       <pre className="text-sm whitespace-pre-wrap break-words font-sans">{selectedReading.aiInterpretation}</pre>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </ScrollArea>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => exportReadingToJson(selectedReading)}>
                <DownloadCloud className="mr-2 h-4 w-4" /> Export to JSON
              </Button>
              <AlertDialogCancel onClick={() => setSelectedReading(null)}>{t('cancel')}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

    