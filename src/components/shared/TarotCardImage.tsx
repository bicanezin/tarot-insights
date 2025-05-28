
"use client";
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TarotCardImageProps {
  cardName?: string;
  imageNameHint?: string; // e.g. "the fool" "strength lion"
  isReversed: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export function TarotCardImage({ cardName, imageNameHint, isReversed, className, width = 150, height = 250 }: TarotCardImageProps) {
  let aiHint: string;

  if (imageNameHint) {
    // Prioritize imageNameHint if provided (should be 1-2 words, space-separated)
    aiHint = imageNameHint;
  } else if (cardName) {
    // Fallback: take the first one or two words of cardName
    const words = cardName.toLowerCase().match(/\b(\w+)\b/g) || []; // Match words
    aiHint = words.slice(0, 2).join(' ');
    if (!aiHint) { // If cardName didn't produce words (e.g., empty or symbols only)
      aiHint = "tarot card";
    }
  } else {
    // Absolute fallback
    aiHint = "tarot card";
  }

  // Ensure the hint doesn't exceed a practical length for an attribute, though "two words" rule usually covers this.
  aiHint = aiHint.substring(0, 50);


  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-lg border border-border", className)} style={{ width, height }}>
      <Image
        src={`https://placehold.co/${width}x${height}.png`}
        alt={cardName || 'Tarot Card'}
        width={width}
        height={height}
        data-ai-hint={aiHint}
        className={cn(
          'object-cover transition-transform duration-500 ease-in-out',
          isReversed ? 'transform rotate-180' : ''
        )}
      />
      {cardName && (
         <div className={cn(
            "absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-1 rounded text-center pointer-events-none",
            isReversed ? 'transform rotate-180' : ''
          )}>
          <span className={cn(isReversed ? 'inline-block transform rotate-180' : '')}>{cardName}</span>
        </div>
      )}
    </div>
  );
}

// Placeholder for card back
export function CardBack({ className, width = 150, height = 250 }: Pick<TarotCardImageProps, 'className' | 'width' | 'height'>) {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden shadow-lg border border-primary bg-primary/20 flex items-center justify-center",
        "hover:shadow-xl transition-shadow cursor-pointer",
        className
      )}
      style={{ width, height }}
      data-ai-hint="card back pattern"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 17.5c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    </div>
  );
}
