"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { getPersonalizedStepGoals } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Zap className="mr-2 h-4 w-4" />
      )}
      Generate Goal
    </Button>
  );
}

export default function StepGoal() {
  const initialState = { message: undefined, errors: {}, data: undefined };
  const [state, dispatch] = useActionState(getPersonalizedStepGoals, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        title: "Oops!",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <section className="py-16 sm:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            AI-Powered Step Goals
          </h2>
          <p className="text-lg text-muted-foreground">
            Not sure where to start? Let our AI assistant create a personalized
            and achievable daily step goal for you based on your profile and
            activity level.
          </p>
          <div className="pt-4">
            <Card>
              <form action={dispatch}>
                <CardHeader>
                  <CardTitle>Personalized Step Goal</CardTitle>
                  <CardDescription>
                    Fill in your details to get a custom goal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="e.g., 30"
                        defaultValue="30"
                        required
                      />
                      {state.errors?.age && (
                        <p className="text-sm text-destructive">{state.errors.age[0]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select name="gender" defaultValue="female">
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activityLevel">Activity Level</Label>
                    <Select name="activityLevel" defaultValue="lightly active">
                      <SelectTrigger id="activityLevel">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="lightly active">Lightly Active</SelectItem>
                        <SelectItem value="moderately active">Moderately Active</SelectItem>
                        <SelectItem value="very active">Very Active</SelectItem>
                        <SelectItem value="extra active">Extra Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentStepCount">Current Avg. Daily Steps</Label>
                    <Input
                      id="currentStepCount"
                      name="currentStepCount"
                      type="number"
                      placeholder="e.g., 4000"
                      defaultValue="4000"
                      required
                    />
                    {state.errors?.currentStepCount && (
                      <p className="text-sm text-destructive">{state.errors.currentStepCount[0]}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton />
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {state.data ? (
            <Card className="w-full max-w-md bg-gradient-to-br from-primary/20 to-accent/20">
              <CardHeader className="text-center">
                <CardDescription>Your Personalized Goal</CardDescription>
                <CardTitle className="text-6xl font-bold text-primary">
                  {state.data.suggestedStepGoal.toLocaleString()}
                </CardTitle>
                <p className="text-muted-foreground">steps / day</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-2">Reasoning:</p>
                <p className="text-muted-foreground">{state.data.reasoning}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-md flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <Zap className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold text-lg">Your AI-generated goal will appear here.</h3>
                <p className="text-muted-foreground text-sm">Fill out the form to get started!</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
