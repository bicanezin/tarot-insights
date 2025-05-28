
import type { Spread } from '@/types';

// Keys for translation should be unique and descriptive.
// Pattern: spread_{id}_name for spread name
// Pattern: spread_{id}_pos_{index} for position names

export const spreads: Spread[] = [
  { id: 'yn1', name: 'spread_yn1_name', category: 'Yes/No', cardCount: 1, positions: ['spread_yn1_pos_0'], layoutType: 'single-card' },
  { id: 'yn2', name: 'spread_yn2_name', category: 'Yes/No', cardCount: 3, positions: ['spread_yn2_pos_0', 'spread_yn2_pos_1', 'spread_yn2_pos_2'], layoutType: 'row-3' },
  { id: 'l1', name: 'spread_l1_name', category: 'Love', cardCount: 3, positions: ['spread_l1_pos_0', 'spread_l1_pos_1', 'spread_l1_pos_2'], layoutType: 'row-3' },
  { id: 'l2', name: 'spread_l2_name', category: 'Love', cardCount: 5, positions: ['spread_l2_pos_0', 'spread_l2_pos_1', 'spread_l2_pos_2', 'spread_l2_pos_3', 'spread_l2_pos_4'], layoutType: 'cross-5-love2' },
  { id: 'p1', name: 'spread_p1_name', category: 'Professional', cardCount: 3, positions: ['spread_p1_pos_0', 'spread_p1_pos_1', 'spread_p1_pos_2'], layoutType: 'row-3' },
  { id: 'p2', name: 'spread_p2_name', category: 'Professional', cardCount: 4, positions: ['spread_p2_pos_0', 'spread_p2_pos_1', 'spread_p2_pos_2', 'spread_p2_pos_3'], layoutType: 'square-4-project' },
  { id: 'f1', name: 'spread_f1_name', category: 'Financial', cardCount: 3, positions: ['spread_f1_pos_0', 'spread_f1_pos_1', 'spread_f1_pos_2'], layoutType: 'row-3-financial1' },
  { id: 'f2', name: 'spread_f2_name', category: 'Financial', cardCount: 4, positions: ['spread_f2_pos_0', 'spread_f2_pos_1', 'spread_f2_pos_2', 'spread_f2_pos_3'], layoutType: 'square-4-wealth' },
];

export const getSpreadById = (id: string): Spread | undefined => spreads.find(s => s.id === id);
