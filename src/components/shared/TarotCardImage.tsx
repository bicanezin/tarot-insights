
"use client";
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TarotCardImageProps {
  cardName?: string;
  imageNameHint?: string; // e.g. "the fool" "strength lion"
  imageUrl?: string; // Optional direct image URL
  isReversed: boolean;
  className?: string;
  width?: number; // For next/image optimization and placeholder aspect ratio
  height?: number; // For next/image optimization and placeholder aspect ratio
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

  // Use provided width/height for placeholder, otherwise default
  const placeholderWidth = width;
  const placeholderHeight = height;
  const imageSource = imageUrl || `https://placehold.co/${placeholderWidth}x${placeholderHeight}.png`;

  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-lg border border-border", className)}>
      <Image
        src={imageSource}
        alt={cardName || 'Tarot Card'}
        width={width} // Used by Next/Image for aspect ratio and optimization
        height={height} // Used by Next/Image for aspect ratio and optimization
        data-ai-hint={aiHint}
        className={cn(
          'object-cover transition-transform duration-500 ease-in-out w-full h-full',
          isReversed ? 'transform rotate-180' : ''
        )}
        unoptimized={!!imageUrl}
      />
      {cardName && (
         <div className={cn(
            "absolute bottom-1 left-1 right-1 bg-black/50 text-white text-[10px] sm:text-xs p-1 rounded text-center pointer-events-none",
            isReversed ? 'transform rotate-180' : ''
          )}>
          <span className={cn("inline-block", isReversed ? 'transform rotate-180' : '')}>{cardName}</span>
        </div>
      )}
    </div>
  );
}

// Placeholder for card back
export function CardBack({ className }: Pick<TarotCardImageProps, 'className'>) {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden shadow-lg border border-primary bg-primary/20 flex items-center justify-center",
        "hover:shadow-xl transition-shadow cursor-pointer",
        className // This className should control width and aspect-ratio (e.g., "w-full aspect-[3/5]")
      )}
      data-ai-hint="card back pattern"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2 text-primary-foreground opacity-50">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 17.5c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    </div>
  );
}
