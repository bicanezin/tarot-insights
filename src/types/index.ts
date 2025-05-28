
export interface TarotCard {
  id: number;
  name: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  yesNo: 'Yes' | 'No' | 'Maybe';
  imageName?: string; // e.g., "the-fool" to derive placeholder hint
  imageUrl?: string; // Optional URL for the card's image
}

export interface Spread {
  id: string;
  name: string;
  category: 'Yes/No' | 'Love' | 'Professional' | 'Financial';
  cardCount: number;
  positions: string[];
  layoutType?: string; // For hints on visual layout, e.g., 'cross-5', 'row-3'
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  positionName: string;
}

export interface SavedReading {
  id: string;
  userName: string;
  readingDate: string;
  customDetails?: string;
  spread: Spread;
  drawnCards: DrawnCard[];
  aiInterpretation?: string;
  timestamp: number;
}
