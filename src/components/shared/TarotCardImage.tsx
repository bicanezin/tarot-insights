
"use client";
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TarotCardImageProps {
  cardName?: string;
  imageNameHint?: string; // e.g. "the fool" "strength lion"
  imageUrl?: string; // Optional direct image URL
  isReversed: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export function TarotCardImage({ cardName, imageNameHint, imageUrl, isReversed, className, width = 150, height = 250 }: TarotCardImageProps) {
  let aiHint: string;

  if (imageNameHint) {
    aiHint = imageNameHint;
  } else if (cardName) {
    const words = cardName.toLowerCase().match(/\b(\w+)\b/g) || [];
    aiHint = words.slice(0, 2).join(' ');
    if (!aiHint) {
      aiHint = "tarot card";
    }
  } else {
    aiHint = "tarot card";
  }
  aiHint = aiHint.substring(0, 50);

  const imageSource = imageUrl || `https://placehold.co/${width}x${height}.png`;

  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-lg border border-border", className)} style={{ width, height }}>
      <Image
        src={imageSource}
        alt={cardName || 'Tarot Card'}
        width={width}
        height={height}
        data-ai-hint={aiHint}
        className={cn(
          'object-cover transition-transform duration-500 ease-in-out w-full h-full', // Added w-full h-full for better image fill
          isReversed ? 'transform rotate-180' : ''
        )}
        // If using external imageUrls, ensure they are added to next.config.ts remotePatterns
        unoptimized={!!imageUrl} // Useful if using many different external domains for imageUrl
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
        "hover:shadow-xl transition-shadow cursor-pointer h-full w-full", // Ensure CardBack also respects dimensions
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
