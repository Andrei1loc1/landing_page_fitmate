'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing daily exercise and mental relaxation video suggestions based on user preferences.
 *
 * - dailyExerciseVideoSuggestions - A function that suggests exercise and relaxation videos.
 * - DailyExerciseVideoSuggestionsInput - The input type for the dailyExerciseVideoSuggestions function.
 * - DailyExerciseVideoSuggestionsOutput - The return type for the dailyExerciseVideoSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyExerciseVideoSuggestionsInputSchema = z.object({
  fitnessLevel: z
    .string()
    .describe("The user's fitness level (e.g., beginner, intermediate, advanced)."),
  preferredExerciseType: z
    .string()
    .describe('The user’s preferred type of exercise (e.g., yoga, cardio, strength training).'),
  preferredRelaxationType: z
    .string()
    .describe('The user’s preferred type of relaxation (e.g., meditation, breathing exercises, nature sounds).'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available for exercise and relaxation (e.g., 15 minutes, 30 minutes, 1 hour).'),
});
export type DailyExerciseVideoSuggestionsInput = z.infer<
  typeof DailyExerciseVideoSuggestionsInputSchema
>;

const DailyExerciseVideoSuggestionsOutputSchema = z.object({
  exerciseVideo: z.object({
    title: z.string().describe('The title of the exercise video.'),
    url: z.string().url().describe('The URL of the exercise video.'),
    description: z.string().describe('A brief description of the exercise video.'),
  }),
  relaxationVideo: z.object({
    title: z.string().describe('The title of the relaxation video.'),
    url: z.string().url().describe('The URL of the relaxation video.'),
    description: z.string().describe('A brief description of the relaxation video.'),
  }),
});
export type DailyExerciseVideoSuggestionsOutput = z.infer<
  typeof DailyExerciseVideoSuggestionsOutputSchema
>;

export async function dailyExerciseVideoSuggestions(
  input: DailyExerciseVideoSuggestionsInput
): Promise<DailyExerciseVideoSuggestionsOutput> {
  return dailyExerciseVideoSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyExerciseVideoSuggestionsPrompt',
  input: {schema: DailyExerciseVideoSuggestionsInputSchema},
  output: {schema: DailyExerciseVideoSuggestionsOutputSchema},
  prompt: `You are an AI assistant that suggests daily exercise and mental relaxation videos based on user preferences.

  The user has the following preferences:
  - Fitness level: {{{fitnessLevel}}}
  - Preferred exercise type: {{{preferredExerciseType}}}
  - Preferred relaxation type: {{{preferredRelaxationType}}}
  - Available time: {{{availableTime}}}

  Suggest one exercise video and one relaxation video that match the user's preferences. Provide the title, URL, and a brief description for each video. Make sure the URLs are valid.
  `,
});

const dailyExerciseVideoSuggestionsFlow = ai.defineFlow(
  {
    name: 'dailyExerciseVideoSuggestionsFlow',
    inputSchema: DailyExerciseVideoSuggestionsInputSchema,
    outputSchema: DailyExerciseVideoSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
