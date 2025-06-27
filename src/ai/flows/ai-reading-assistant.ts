
// This is an auto-generated file from Firebase Studio.

'use server';

/**
 * @fileOverview An AI assistant that provides personalized tarot reading interpretations based on the selected spread, drawn cards, and user details.
 *
 * - generateTarotReadingInterpretation - A function that generates the tarot reading interpretation.
 * - TarotReadingInput - The input type for the generateTarotReadingInterpretation function.
 * - TarotReadingOutput - The return type for the generateTarotReadingInterpretation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TarotCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  meaning_up: z.string(),
  meaning_rev: z.string(),
  desc: z.string(),
  yesNo: z.enum(['Yes', 'No', 'Maybe']),
});

const SpreadSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['Yes/No', 'Love', 'Professional', 'Financial']),
  cardCount: z.number(),
  positions: z.array(z.string()),
});

const DrawnCardSchema = z.object({
  card: TarotCardSchema,
  isReversed: z.boolean(),
});

const TarotReadingInputSchema = z.object({
  spread: SpreadSchema,
  drawnCards: z.array(DrawnCardSchema),
  userName: z.string().describe('The name of the person receiving the tarot reading.'),
  readingDate: z.string().describe('The date the tarot reading is taking place.'),
  customDetails: z.string().optional().describe('Any custom details provided by the user to be considered in the interpretation.'),
  language: z.enum(['en', 'pt']).default('en').describe('The language to be used for the interpretation (en: English, pt: Portuguese).'),
  isPortuguese: z.boolean().optional().describe('Internal flag indicating if the language is Portuguese for template logic.'),
});

export type TarotReadingInput = z.infer<typeof TarotReadingInputSchema>;

const TarotReadingOutputSchema = z.object({
  interpretation: z.string().describe('The AI-generated interpretation of the tarot reading.'),
});

export type TarotReadingOutput = z.infer<typeof TarotReadingOutputSchema>;

export async function generateTarotReadingInterpretation(input: TarotReadingInput): Promise<TarotReadingOutput> {
  // Prepare input for the flow, including setting the isPortuguese flag
  const flowInput: TarotReadingInput = {
    ...input,
    isPortuguese: input.language === 'pt',
  };
  return generateTarotReadingInterpretationFlow(flowInput);
}

const prompt = ai.definePrompt({
  name: 'tarotReadingInterpretationPrompt',
  input: {schema: TarotReadingInputSchema},
  output: {schema: TarotReadingOutputSchema},
  prompt: `You are an expert tarot reader providing personalized interpretations.

  Provide a detailed interpretation of the tarot reading based on the following information:

  User Name: {{{userName}}}
  Reading Date: {{{readingDate}}}
  Spread Name: {{{spread.name}}}
  Spread Category: {{{spread.category}}}
  Custom Details: {{#if customDetails}}{{{customDetails}}}{{else}}None{{/if}}

  Cards Drawn:
  {{#each drawnCards}}
  - Position: {{{@index}}}, Card Name: {{{this.card.name}}}, Reversed: {{#if this.isReversed}}Yes{{else}}No{{/if}}, Meaning ({{#if this.isReversed}}Reversed{{else}}Upright{{/if}}): {{#if this.isReversed}}{{{this.card.meaning_rev}}}{{else}}{{{this.card.meaning_up}}}{{/if}}
  {{/each}}

  Consider the relationships between the cards and the overall message of the spread.
  Pay attention to the user details and custom details to make the interpretation more relevant.

  {{#if isPortuguese}}
  Translate the interpretation to Portuguese.
  {{/if}}
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});



const generateTarotReadingInterpretationFlow = ai.defineFlow(
  {
    name: 'generateTarotReadingInterpretationFlow',
    inputSchema: TarotReadingInputSchema, // The flow externally receives the original schema
    outputSchema: TarotReadingOutputSchema,
  },
  async (flowInput: TarotReadingInput) => {
    // The prompt will receive the flowInput which now includes isPortuguese
    // as set by the wrapper function generateTarotReadingInterpretation
    console.log(prompt)
    console.log(flowInput)
    const {output} = await prompt(flowInput);
    return output!;
  }
);

