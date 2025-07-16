'use server';
/**
 * @fileOverview An AI agent that suggests the best route combinations based on various factors.
 *
 * - optimizeRouteWithShravyaAI - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRouteWithShravyaAI function.
 * - OptimizeRouteOutput - The return type for the optimizeRouteWithShravyaAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  startLocation: z.string().describe('The starting location of the journey.'),
  endLocation: z.string().describe('The destination location of the journey.'),
  departureTime: z.string().describe('The desired departure time.'),
  seatAvailability: z.string().describe('The seat availability for different modes of transport.'),
  priceRange: z.string().describe('The price range for the entire journey.'),
  timeToReach: z.string().describe('The acceptable time to reach the destination.'),
  cancellationDetails: z.string().describe('Cancellation details for different modes of transport.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  suggestedRoutes: z.array(z.string()).describe('An array of suggested route combinations.'),
  reasoning: z.string().describe('The reasoning behind the suggested routes.'),
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRouteWithShravyaAI(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteWithShravyaAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRouteWithShravyaAIPrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are Shravya AI, an expert in suggesting the best travel routes.

  Based on the following information, suggest the best route combinations (Train+Cab, Flight+Bus, etc.) considering seat availability, price, time-to-reach, and cancellation details.

  Start Location: {{{startLocation}}}
  End Location: {{{endLocation}}}
  Departure Time: {{{departureTime}}}
  Seat Availability: {{{seatAvailability}}}
  Price Range: {{{priceRange}}}
  Time to Reach: {{{timeToReach}}}
  Cancellation Details: {{{cancellationDetails}}}

  Consider all factors and provide a detailed reasoning for your suggested routes.
  Ensure the suggested routes are practical and optimized for the user's needs.

  Output the suggested routes and the detailed reasoning.
  `,
});

const optimizeRouteWithShravyaAIFlow = ai.defineFlow(
  {
    name: 'optimizeRouteWithShravyaAIFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
