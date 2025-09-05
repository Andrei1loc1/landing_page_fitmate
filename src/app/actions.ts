
"use server";

import { z } from "zod";
import {
  personalizedStepGoals,
  PersonalizedStepGoalsOutput,
} from "@/ai/flows/personalized-step-goals";
import {
  dailyExerciseVideoSuggestions,
  DailyExerciseVideoSuggestionsOutput,
} from "@/ai/flows/daily-exercise-video-suggestions";
import { StepGoalSchema } from "@/lib/schemas";
import { DailyTipsSchema } from "@/lib/schemas";

export type StepGoalState = {
  message?: string;
  data?: PersonalizedStepGoalsOutput;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function getPersonalizedStepGoals(
  prevState: StepGoalState,
  formData: FormData
): Promise<StepGoalState> {
  const validatedFields = StepGoalSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  try {
    const result = await personalizedStepGoals(validatedFields.data);
    return { message: "Your personalized goal is ready!", data: result };
  } catch (error) {
    console.error(error);
    return {
      message:
        "An error occurred while generating your step goal. Please try again.",
    };
  }
}

export type DailyTipsState = {
  message?: string;
  data?: DailyExerciseVideoSuggestionsOutput;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function getDailyExerciseVideoSuggestions(
  prevState: DailyTipsState,
  formData: FormData
): Promise<DailyTipsState> {
  // The AI flow is specific about the input strings, let's use what it expects.
  const dailyTipsAiSchema = z.object({
    fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
    preferredExerciseType: z.enum(["yoga", "cardio", "strength training"]),
    preferredRelaxationType: z.enum([
      "meditation",
      "breathing exercises",
      "nature sounds",
    ]),
    availableTime: z.enum(["15 minutes", "30 minutes", "1 hour"]),
  });

  const rawData = Object.fromEntries(formData.entries());

  // Coerce inputs to match the AI schema.
  const coercedData = {
    ...rawData,
    preferredExerciseType:
      rawData.preferredExerciseType === "flexibility"
        ? "strength training"
        : rawData.preferredExerciseType,
    preferredRelaxationType:
      rawData.preferredRelaxationType === "stretching"
        ? "breathing exercises"
        : rawData.preferredRelaxationType,
    availableTime:
      rawData.availableTime === "45 minutes" ? "30 minutes" : rawData.availableTime,
  };

  const validatedFields = dailyTipsAiSchema.safeParse(coercedData);

  if (!validatedFields.success) {
    const originalValidation = DailyTipsSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!originalValidation.success) {
      return {
        errors: originalValidation.error.flatten().fieldErrors,
        message: "Please correct the errors below.",
      };
    }
    return {
      message: "There was an issue processing your preferences.",
    };
  }

  try {
    const result = await dailyExerciseVideoSuggestions(validatedFields.data);
    return { message: "Your daily suggestions are here!", data: result };
  } catch (error) {
    console.error(error);
    return {
      message:
        "An error occurred while generating suggestions. Please try again.",
    };
  }
}
