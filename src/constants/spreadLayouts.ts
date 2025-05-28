
export interface CardPositionStyle {
  gridArea?: string;
  style?: React.CSSProperties; // For additional inline styles if needed
}

export interface SpreadLayoutConfig {
  containerClassName: string;
  cardPositions: CardPositionStyle[];
}

export const spreadLayouts: Record<string, SpreadLayoutConfig> = {
  'single-card': {
    containerClassName: 'flex justify-center items-center p-4 min-h-[300px]',
    cardPositions: [{}] 
  },
  'row-3': {
    containerClassName: 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4 items-start justify-center',
    cardPositions: [
      { gridArea: '1 / 1 / auto / auto' },
      { gridArea: '1 / 2 / auto / auto' },
      { gridArea: '1 / 3 / auto / auto' },
    ]
  },
  'cross-5-love2': { // Corresponds to l2: Finding New Love & user "LOVE SPREAD 2"
    // Layout:  C3
    //       C1 C5 C2
    //          C4
    containerClassName: 'grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-4 p-4 w-full max-w-2xl mx-auto items-center justify-center min-h-[600px]',
    cardPositions: [
      { gridArea: '2 / 1 / 3 / 2' }, // Pos 1: Your Readiness (Left)
      { gridArea: '2 / 3 / 3 / 4' }, // Pos 2: What You Seek (Right)
      { gridArea: '1 / 2 / 2 / 3' }, // Pos 3: An Obstacle (Top)
      { gridArea: '3 / 2 / 4 / 3' }, // Pos 4: Path to Love (Bottom)
      { gridArea: '2 / 2 / 3 / 3' }, // Pos 5: Potential Future (Center)
    ]
  },
  'square-4-project': { // Corresponds to p2: Project Success
    // Layout: C1 C2
    //         C3 C4
    containerClassName: 'grid grid-cols-2 grid-rows-2 gap-6 p-4 w-full max-w-md mx-auto items-center justify-center min-h-[550px]',
    cardPositions: [
      { gridArea: '1 / 1 / 2 / 2' }, // Pos 1
      { gridArea: '1 / 2 / 2 / 3' }, // Pos 2
      { gridArea: '2 / 1 / 3 / 2' }, // Pos 3
      { gridArea: '2 / 2 / 3 / 3' }, // Pos 4
    ]
  },
  'row-3-financial1': { // Corresponds to f1: Financial Snapshot & user "FINANTIAL SPREAD 2"
    containerClassName: 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4 items-start justify-center',
    cardPositions: [
      { gridArea: '1 / 1 / auto / auto' }, 
      { gridArea: '1 / 2 / auto / auto' }, 
      { gridArea: '1 / 3 / auto / auto' }, 
    ]
  },
  'square-4-wealth': { // Corresponds to f2: Wealth Growth
    // Layout: C1 C2
    //         C3 C4
    containerClassName: 'grid grid-cols-2 grid-rows-2 gap-6 p-4 w-full max-w-md mx-auto items-center justify-center min-h-[550px]',
     cardPositions: [
      { gridArea: '1 / 1 / 2 / 2' }, // Pos 1
      { gridArea: '1 / 2 / 2 / 3' }, // Pos 2
      { gridArea: '2 / 1 / 3 / 2' }, // Pos 3
      { gridArea: '2 / 2 / 3 / 3' }, // Pos 4
    ]
  }
};

export const getLayoutConfig = (layoutType: string | undefined, cardCount: number): SpreadLayoutConfig => {
  if (layoutType && spreadLayouts[layoutType]) {
    return spreadLayouts[layoutType];
  }
  // Generic fallback layout: responsive grid
  const cols = cardCount <= 2 ? cardCount : (cardCount === 4 ? 2 : 3); // 1, 2, or 3 columns
  return {
    containerClassName: `grid grid-cols-1 sm:grid-cols-${Math.min(cardCount, 2)} md:grid-cols-${cols} gap-6 p-4 items-start justify-center`,
    cardPositions: Array(cardCount).fill({}).map((_, i) => ({
       // This generic mapping might not be perfect for grid-area but works for sequential items
    })),
  };
};
