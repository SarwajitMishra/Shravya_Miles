'use server';
/**
 * @fileOverview An AI agent that suggests optimal travel route options based on user preferences.
 *
 * - optimizeRouteOptions - A function that handles the route optimization process.
 * - OptimizeRouteOptionsInput - The input type for the optimizeRouteOptions function.
 * - OptimizeRouteOptionsOutput - The return type for the optimizeRouteOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteOptionsInputSchema = z.object({
  startLocation: z.string().describe('The starting location of the journey.'),
  endLocation: z.string().describe('The destination location of the journey.'),
  departureTime: z.string().describe('The desired departure time.'),
  modesOfTransport: z.string().describe('Preferred modes of transport (e.g., train, bus, flight, cab).'),
  pricePreference: z.string().describe('Preference for price (e.g., cheapest, reasonable).'),
  travelTimePreference: z.string().describe('Preference for travel time (e.g., fastest, reasonable).'),
  seatAvailabilityPreference: z.string().describe('Preference for seat availability (e.g., guaranteed, flexible).'),
});
export type OptimizeRouteOptionsInput = z.infer<typeof OptimizeRouteOptionsInputSchema>;

const OptimizeRouteOptionsOutputSchema = z.object({
  routeOptions: z.array(z.string()).describe('An array of optimized route options with combinations of transport modes.'),
  reasoning: z.string().describe('The detailed reasoning behind the suggested route options.'),
});
export type OptimizeRouteOptionsOutput = z.infer<typeof OptimizeRouteOptionsOutputSchema>;

export async function optimizeRouteOptions(input: OptimizeRouteOptionsInput): Promise<OptimizeRouteOptionsOutput> {
  return optimizeRouteOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRouteOptionsPrompt',
  input: {schema: OptimizeRouteOptionsInputSchema},
  output: {schema: OptimizeRouteOptionsOutputSchema},
  prompt: `You are an AI travel assistant that specializes in optimizing travel route options.

  Based on the user's preferences, suggest the best route options by combining different modes of transport (train, bus, flight, cab).
  Consider price, travel time, and seat availability to provide the most convenient and cost-effective routes.

  Start Location: {{{startLocation}}}
  End Location: {{{endLocation}}}
  Departure Time: {{{departureTime}}}
  Preferred Modes of Transport: {{{modesOfTransport}}}
  Price Preference: {{{pricePreference}}}
  Travel Time Preference: {{{travelTimePreference}}}
  Seat Availability Preference: {{{seatAvailabilityPreference}}}

  Provide a detailed reasoning for each suggested route option, explaining why it is a good choice based on the user's preferences.
`,
});

const optimizeRouteOptionsFlow = ai.defineFlow(
  {
    name: 'optimizeRouteOptionsFlow',
    inputSchema: OptimizeRouteOptionsInputSchema,
    outputSchema: OptimizeRouteOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
