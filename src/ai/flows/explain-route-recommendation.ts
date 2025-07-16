// src/ai/flows/explain-route-recommendation.ts
'use server';
/**
 * @fileOverview An AI agent that explains the reasoning behind a route recommendation.
 *
 * - explainRouteRecommendation - A function that handles the route explanation process.
 * - ExplainRouteRecommendationInput - The input type for the explainRouteRecommendation function.
 * - ExplainRouteRecommendationOutput - The return type for the explainRouteRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRouteRecommendationInputSchema = z.object({
  route: z.string().describe('The route to explain.'),
  seatAvailability: z.string().describe('The seat availability for different modes of transport.'),
  priceRange: z.string().describe('The price range for the entire journey.'),
  timeToReach: z.string().describe('The acceptable time to reach the destination.'),
  cancellationDetails: z.string().describe('Cancellation details for different modes of transport.'),
  potentialDelays: z.string().describe('Potential delays for different modes of transport.'),
});
export type ExplainRouteRecommendationInput = z.infer<typeof ExplainRouteRecommendationInputSchema>;

const ExplainRouteRecommendationOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the route recommendation.'),
});
export type ExplainRouteRecommendationOutput = z.infer<typeof ExplainRouteRecommendationOutputSchema>;

export async function explainRouteRecommendation(
  input: ExplainRouteRecommendationInput
): Promise<ExplainRouteRecommendationOutput> {
  return explainRouteRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRouteRecommendationPrompt',
  input: {schema: ExplainRouteRecommendationInputSchema},
  output: {schema: ExplainRouteRecommendationOutputSchema},
  prompt: `You are an AI travel expert. Explain the reasoning behind the following route recommendation, highlighting factors such as price fluctuations, real-time seat availability, and potential delays, so that the user can understand the trade-offs and make an informed decision.

Route: {{{route}}}
Seat Availability: {{{seatAvailability}}}
Price Range: {{{priceRange}}}
Time to Reach: {{{timeToReach}}}
Cancellation Details: {{{cancellationDetails}}}
Potential Delays: {{{potentialDelays}}}
`,
});

const explainRouteRecommendationFlow = ai.defineFlow(
  {
    name: 'explainRouteRecommendationFlow',
    inputSchema: ExplainRouteRecommendationInputSchema,
    outputSchema: ExplainRouteRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
