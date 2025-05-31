"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TarotCardImageProps {
  cardName?: string;
  imageNameHint?: string; // e.g. "the fool" "strength lion"
  imageUrl?: string; // Optional direct image URL
  isReversed: boolean;
  className?: string;
  width?: number; // For next/image optimization and placeholder aspect ratio
  height?: number; // For next/image optimization and placeholder aspect ratio
}

export function TarotCardImage({
  cardName,
  imageNameHint,
  imageUrl,
  isReversed,
  className,
  width = 150,
  height = 250,
}: TarotCardImageProps) {
  let aiHint: string;

  if (imageNameHint) {
    aiHint = imageNameHint;
  } else if (cardName) {
    const words = cardName.toLowerCase().match(/\b(\w+)\b/g) || [];
    aiHint = words.slice(0, 2).join(" ");
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
        alt={cardName || "Tarot Card"}
        width={width} // Used by Next/Image for aspect ratio and optimization
        height={height} // Used by Next/Image for aspect ratio and optimization
        data-ai-hint={aiHint}
        className={cn(
          "object-contain transition-transform duration-500 ease-in-out w-full h-full",
          isReversed ? "transform rotate-180" : ""
        )}
        unoptimized={!!imageUrl && !imageUrl.startsWith("https://placehold.co")} // unoptimize if it's a user-provided image that's not a placeholder
      />
      {/* {cardName && (
        <div
          className={cn(
            "absolute bottom-1 left-1 right-1 bg-black/50 text-white text-[10px] sm:text-xs p-1 rounded text-center pointer-events-none",
            isReversed ? "transform rotate-180" : ""
          )}
        >
          <span className={cn("inline-block", isReversed ? "transform rotate-180" : "")}>{cardName}</span>
        </div>
      )} */}
    </div>
  );
}

// Placeholder for card back
export function CardBack({ className, width = 150, height = 250 }: Pick<TarotCardImageProps, "className" | "width" | "height">) {
  const cardBackUrl =
    "https://img.freepik.com/premium-vector/astrological-tarot-design-with-zodiac-elements-mystic-ritual-card_543062-4718.jpg";
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden shadow-lg border border-primary",
        "hover:shadow-xl transition-shadow cursor-pointer",
        className // This className should control width and aspect-ratio (e.g., "w-full aspect-[3/5]")
      )}
    >
      <Image
        src={cardBackUrl}
        alt="Card Back"
        width={width}
        height={height}
        data-ai-hint="tarot card back"
        className="object-cover w-full h-full"
        unoptimized={true} // External image, might not be optimizable by Next/Image by default or might have its own optimizations
      />
    </div>
  );
}
