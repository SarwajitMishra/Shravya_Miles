'use server';
/**
 * @fileOverview An AI agent that suggests a travel plan based on a user prompt.
 *
 * - suggestTravelPlanFromPrompt - A function that handles the travel plan suggestion process.
 * - SuggestTravelPlanFromPromptInput - The input type for the suggestTravelPlanFromPrompt function.
 * - SuggestTravelPlanFromPromptOutput - The return type for the suggestTravelPlanFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTravelPlanFromPromptInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired travel plan.'),
});
export type SuggestTravelPlanFromPromptInput = z.infer<
  typeof SuggestTravelPlanFromPromptInputSchema
>;

const SuggestTravelPlanFromPromptOutputSchema = z.object({
  travelPlan: z.string().describe('The suggested travel plan.'),
});
export type SuggestTravelPlanFromPromptOutput = z.infer<
  typeof SuggestTravelPlanFromPromptOutputSchema
>;

export async function suggestTravelPlanFromPrompt(
  input: SuggestTravelPlanFromPromptInput
): Promise<SuggestTravelPlanFromPromptOutput> {
  return suggestTravelPlanFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTravelPlanFromPromptPrompt',
  input: {schema: SuggestTravelPlanFromPromptInputSchema},
  output: {schema: SuggestTravelPlanFromPromptOutputSchema},
  prompt: `You are an AI travel assistant. A user has provided the following prompt describing their desired travel plan: {{{prompt}}}. Suggest a travel plan that satisfies the user's requirements.`,
});

const suggestTravelPlanFromPromptFlow = ai.defineFlow(
  {
    name: 'suggestTravelPlanFromPromptFlow',
    inputSchema: SuggestTravelPlanFromPromptInputSchema,
    outputSchema: SuggestTravelPlanFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
