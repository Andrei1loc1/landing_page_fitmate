'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized daily step goals based on user profile and activity level.
 *
 * - personalizedStepGoals - A function that generates personalized step goals.
 * - PersonalizedStepGoalsInput - The input type for the personalizedStepGoals function.
 * - PersonalizedStepGoalsOutput - The return type for the personalizedStepGoals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStepGoalsInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  gender: z.enum(['male', 'female', 'other']).describe('The gender of the user.'),
  activityLevel: z
    .enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'])
    .describe('The activity level of the user.'),
  currentStepCount: z.number().describe('The current daily step count of the user.'),
});
export type PersonalizedStepGoalsInput = z.infer<typeof PersonalizedStepGoalsInputSchema>;

const PersonalizedStepGoalsOutputSchema = z.object({
  suggestedStepGoal: z
    .number()
    .describe('The suggested daily step goal for the user, based on their profile and activity level.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested step goal, explaining how it was determined.'),
});
export type PersonalizedStepGoalsOutput = z.infer<typeof PersonalizedStepGoalsOutputSchema>;

export async function personalizedStepGoals(input: PersonalizedStepGoalsInput): Promise<PersonalizedStepGoalsOutput> {
  return personalizedStepGoalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStepGoalsPrompt',
  input: {schema: PersonalizedStepGoalsInputSchema},
  output: {schema: PersonalizedStepGoalsOutputSchema},
  prompt: `You are a personal fitness assistant. Based on the user's profile and current activity level, you will suggest a daily step goal that is challenging but achievable.

  Profile:
  Age: {{{age}}}
  Gender: {{{gender}}}
  Activity Level: {{{activityLevel}}}
  Current Step Count: {{{currentStepCount}}}

  Consider the following when determining the suggested step goal:
  - A sedentary person should start with a lower step goal and gradually increase it.
  - A more active person can start with a higher step goal.
  - The goal should be challenging but achievable, and the reasoning should be explained.

  Suggested Step Goal:`,
});

const personalizedStepGoalsFlow = ai.defineFlow(
  {
    name: 'personalizedStepGoalsFlow',
    inputSchema: PersonalizedStepGoalsInputSchema,
    outputSchema: PersonalizedStepGoalsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
