import { z } from "zod";

export const StepGoalSchema = z.object({
  age: z.coerce
    .number()
    .min(10, "Age must be at least 10")
    .max(100, "Age must be at most 100"),
  gender: z.enum(["male", "female", "other"]),
  activityLevel: z.enum([
    "sedentary",
    "lightly active",
    "moderately active",
    "very active",
    "extra active",
  ]),
  currentStepCount: z.coerce
    .number()
    .min(0, "Step count cannot be negative")
    .max(50000, "Step count seems too high"),
});

export type StepGoalForm = z.infer<typeof StepGoalSchema>;

export const DailyTipsSchema = z.object({
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  preferredExerciseType: z.enum([
    "yoga",
    "cardio",
    "strength training",
    "flexibility",
  ]),
  preferredRelaxationType: z.enum([
    "meditation",
    "breathing exercises",
    "nature sounds",
    "stretching",
  ]),
  availableTime: z.enum(["15 minutes", "30 minutes", "45 minutes", "1 hour"]),
});

export type DailyTipsForm = z.infer<typeof DailyTipsSchema>;
