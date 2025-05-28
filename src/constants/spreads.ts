import type { Spread } from '@/types';

export const spreads: Spread[] = [
  { id: 'yn1', name: 'Quick Answer', category: 'Yes/No', cardCount: 1, positions: ['The Answer'], layoutType: 'single-card' },
  { id: 'yn2', name: 'Situation & Outcome', category: 'Yes/No', cardCount: 3, positions: ['The Situation', 'The Obstacle', 'The Likely Outcome'], layoutType: 'row-3' },
  { id: 'l1', name: 'Relationship Check-in', category: 'Love', cardCount: 3, positions: ['You', 'Your Partner', 'The Relationship'], layoutType: 'row-3' },
  { id: 'l2', name: 'Finding New Love', category: 'Love', cardCount: 5, positions: ['Your Readiness', 'What You Seek', 'An Obstacle', 'Path to Love', 'Potential Future'], layoutType: 'cross-5-love2' }, // Mapping to user's "LOVE SPREAD 2" visually
  { id: 'p1', name: 'Career Path', category: 'Professional', cardCount: 3, positions: ['Your Current Role', 'Your Potential', 'Advice for Growth'], layoutType: 'row-3' },
  { id: 'p2', name: 'Project Success', category: 'Professional', cardCount: 4, positions: ['Project Foundation', 'Strengths', 'Challenges', 'Final Outcome'], layoutType: 'square-4-project' }, // Generic 4-card for now
  { id: 'f1', name: 'Financial Snapshot', category: 'Financial', cardCount: 3, positions: ['Current Financial State', 'What is Helping', 'What is Hindering'], layoutType: 'row-3-financial1' }, // Mapping to user's "FINANTIAL SPREAD 2"
  { id: 'f2', name: 'Wealth Growth', category: 'Financial', cardCount: 4, positions: ['Your Money Mindset', 'Opportunity for Growth', 'Action to Take', 'Long-term Potential'], layoutType: 'square-4-wealth' }, // Generic 4-card for now
];

export const getSpreadById = (id: string): Spread | undefined => spreads.find(s => s.id === id);
