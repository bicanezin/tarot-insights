
import type { TarotCard } from '@/types';

export const tarotDeck: TarotCard[] = [
  { id: 0, name: 'The Fool', meaning_up: 'New beginnings, innocence, spontaneity', meaning_rev: 'Recklessness, being taken advantage of', desc: 'Represents a new journey.', yesNo: 'Yes', imageName: 'the fool', imageUrl: undefined },
  { id: 1, name: 'The Magician', meaning_up: 'Willpower, desire, creation, manifestation', meaning_rev: 'Trickery, illusions, out of touch', desc: 'Tapping into your full potential.', yesNo: 'Yes', imageName: 'magician staff', imageUrl: undefined },
  { id: 2, name: 'The High Priestess', meaning_up: 'Intuition, unconscious, inner voice', meaning_rev: 'Lack of center, lost inner voice', desc: 'Trust your intuition.', yesNo: 'Maybe', imageName: 'priestess moon', imageUrl: undefined },
  { id: 3, name: 'The Empress', meaning_up: 'Motherhood, fertility, nature', meaning_rev: 'Dependence, smothering, emptiness', desc: 'Abundance and nurturing.', yesNo: 'Yes', imageName: 'empress nature', imageUrl: undefined },
  { id: 4, name: 'The Emperor', meaning_up: 'Authority, structure, control', meaning_rev: 'Tyranny, rigidity, coldness', desc: 'Establishing order and stability.', yesNo: 'Yes', imageName: 'emperor throne', imageUrl: undefined },
  { id: 5, name: 'The Hierophant', meaning_up: 'Tradition, conformity, morality', meaning_rev: 'Rebellion, subversiveness, new approaches', desc: 'Following established conventions.', yesNo: 'Maybe', imageName: 'hierophant keys', imageUrl: undefined },
  { id: 6, name: 'The Lovers', meaning_up: 'Partnerships, duality, union', meaning_rev: 'Disalignment, one-sidedness', desc: 'Represents a significant choice or relationship.', yesNo: 'Yes', imageName: 'lovers couple', imageUrl: undefined },
  { id: 7, name: 'The Chariot', meaning_up: 'Direction, control, willpower', meaning_rev: 'Lack of control, aggression', desc: 'Moving forward with determination.', yesNo: 'Yes', imageName: 'chariot horses', imageUrl: undefined },
  { id: 8, name: 'Strength', meaning_up: 'Inner strength, bravery, compassion', meaning_rev: 'Self-doubt, weakness, insecurity', desc: 'Harnessing inner power.', yesNo: 'Yes', imageName: 'strength lion', imageUrl: undefined },
  { id: 9, name: 'The Hermit', meaning_up: 'Contemplation, search for truth', meaning_rev: 'Isolation, loneliness, withdrawal', desc: 'A period of introspection.', yesNo: 'Maybe', imageName: 'hermit lantern', imageUrl: undefined },
  { id: 10, name: 'Wheel of Fortune', meaning_up: 'Change, cycles, fate', meaning_rev: 'No control, clinging to control', desc: 'Life is in a state of flux.', yesNo: 'Yes', imageName: 'wheel fortune', imageUrl: undefined },
  { id: 11, name: 'Justice', meaning_up: 'Cause and effect, clarity, truth', meaning_rev: 'Dishonesty, unaccountability', desc: 'Fairness and balance.', yesNo: 'Maybe', imageName: 'justice scales', imageUrl: undefined },
  { id: 12, name: 'The Hanged Man', meaning_up: 'Sacrifice, release, martyrdom', meaning_rev: 'Stalling, needless sacrifice', desc: 'A new perspective is needed.', yesNo: 'Maybe', imageName: 'hanged man', imageUrl: undefined },
  { id: 13, name: 'Death', meaning_up: 'End of cycle, beginnings, change', meaning_rev: 'Fear of change, holding on', desc: 'Transformation and endings.', yesNo: 'No', imageName: 'death skeleton', imageUrl: undefined },
  { id: 14, name: 'Temperance', meaning_up: 'Middle path, patience, finding meaning', meaning_rev: 'Extremes, excess, lack of balance', desc: 'Finding balance and moderation.', yesNo: 'Yes', imageName: 'temperance angel', imageUrl: undefined },
  { id: 15, name: 'The Devil', meaning_up: 'Addiction, materialism, playfulness', meaning_rev: 'Freedom, release, restoring control', desc: 'Confronting your shadow self.', yesNo: 'No', imageName: 'devil chains', imageUrl: undefined },
  { id: 16, name: 'The Tower', meaning_up: 'Sudden upheaval, broken pride', meaning_rev: 'Disaster avoided, fear of suffering', desc: 'Sudden, dramatic change.', yesNo: 'No', imageName: 'tower lightning', imageUrl: undefined },
  { id: 17, name: 'The Star', meaning_up: 'Hope, faith, rejuvenation', meaning_rev: 'Insecurity, discouragement', desc: 'A period of hope and healing.', yesNo: 'Yes', imageName: 'star sky', imageUrl: undefined },
  { id: 18, name: 'The Moon', meaning_up: 'Unconscious, illusions, intuition', meaning_rev: 'Confusion, fear, misinterpretation', desc: 'Navigating the unknown.', yesNo: 'No', imageName: 'moon sky', imageUrl: undefined },
  { id: 19, name: 'The Sun', meaning_up: 'Joy, success, celebration', meaning_rev: 'Negativity, depression, sadness', desc: 'Clarity and optimism.', yesNo: 'Yes', imageName: 'sun child', imageUrl: undefined },
  { id: 20, name: 'Judgement', meaning_up: 'Reflection, reckoning, awakening', meaning_rev: 'Lack of self-awareness, doubt', desc: 'A time of reckoning and decision.', yesNo: 'Maybe', imageName: 'judgement angel', imageUrl: undefined },
  { id: 21, name: 'The World', meaning_up: 'Fulfillment, harmony, completion', meaning_rev: 'Incompletion, no closure', desc: 'Successful completion of a cycle.', yesNo: 'Yes', imageName: 'world dancer', imageUrl: undefined },
  { id: 22, name: 'Ace of Cups', meaning_up: 'New love, compassion, creativity', meaning_rev: 'Blocked or repressed emotions', desc: 'The beginning of love and happiness.', yesNo: 'Yes', imageName: 'ace cups', imageUrl: undefined },
  { id: 23, name: 'Two of Cups', meaning_up: 'Unified love, partnership, attraction', meaning_rev: 'Break-up, disharmony, distrust', desc: 'A deep connection with another.', yesNo: 'Yes', imageName: 'two cups', imageUrl: undefined },
  { id: 24, name: 'Ace of Swords', meaning_up: 'Breakthroughs, new ideas, mental clarity', meaning_rev: 'Confusion, chaos, lack of clarity', desc: 'A moment of profound insight.', yesNo: 'Yes', imageName: 'ace swords', imageUrl: undefined },
  { id: 25, name: 'Nine of Swords', meaning_up: 'Anxiety, worry, fear, depression', meaning_rev: 'Hope, reaching out, despair', desc: 'Mental anguish and sleepless nights.', yesNo: 'No', imageName: 'nine swords', imageUrl: undefined },
  { id: 26, name: 'Six of Cups', meaning_up: 'Revisiting the past, childhood memories', meaning_rev: 'Living in the past, moving on', desc: 'Innocence and nostalgia.', yesNo: 'Maybe', imageName: 'six cups', imageUrl: undefined },
  { id: 28, name: 'Four of Swords', meaning_up: 'Rest, relaxation, meditation', meaning_rev: 'Exhaustion, burnout, stagnation', desc: 'A necessary pause.', yesNo: 'Maybe', imageName: 'four swords', imageUrl: undefined },
  { id: 30, name: 'Seven of Wands', meaning_up: 'Challenge, competition, perseverance', meaning_rev: 'Giving up, overwhelmed', desc: 'Defending your position.', yesNo: 'Yes', imageName: 'seven wands', imageUrl: undefined },
  { id: 31, name: 'Queen of Wands', meaning_up: 'Courage, confidence, independence', meaning_rev: 'Self-respect, a shrinking violet', desc: 'A vibrant and passionate leader.', yesNo: 'Yes', imageName: 'queen wands', imageUrl: undefined },
  { id: 32, name: 'Two of Swords', meaning_up: 'Difficult choices, indecision, stalemate', meaning_rev: 'Lesser of two evils, no right choice', desc: 'A difficult decision must be made.', yesNo: 'No', imageName: 'two swords', imageUrl: undefined },
  { id: 33, name: 'Eight of Cups', meaning_up: 'Disappointment, abandonment, withdrawal', meaning_rev: 'Trying one more time, indecision', desc: 'Walking away from something that no longer serves you.', yesNo: 'Maybe', imageName: 'eight cups', imageUrl: undefined },
  { id: 34, name: 'Four of Pentacles', meaning_up: 'Saving money, security, conservatism', meaning_rev: 'Over-spending, greed, self-protection', desc: 'Holding on tightly to resources.', yesNo: 'No', imageName: 'four pentacles', imageUrl: undefined },
  { id: 35, name: 'Three of Cups', meaning_up: 'Celebration, friendship, creativity', meaning_rev: 'An affair, stifled creativity', desc: 'Community and joyful gatherings.', yesNo: 'Yes', imageName: 'three cups', imageUrl: undefined },
];

// Correcting duplicate IDs and ensuring unique entries
const uniqueCardMap = new Map<number, TarotCard>();
tarotDeck.forEach(card => {
  if (!uniqueCardMap.has(card.id)) {
    uniqueCardMap.set(card.id, card);
  }
});
// Add more cards to make it a full 78 card deck, for now use the unique ones provided
export const fullTarotDeck: TarotCard[] = Array.from(uniqueCardMap.values());

// For simplicity, we'll use the provided subset, but ensure no duplicates in the actual app logic if drawing from this 'fullTarotDeck'
// The initial request had some duplicate card names with different IDs (e.g. Wheel of Fortune, Chariot)
// For now, the `tarotDeck` provided is used as is, assuming the IDs are what matter for uniqueness if names repeat.
// The `fullTarotDeck` above is a de-duplicated version by ID, which is more robust.
// We will use `fullTarotDeck` for drawing.
