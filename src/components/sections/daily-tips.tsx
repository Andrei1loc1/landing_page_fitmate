"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { getDailyExerciseVideoSuggestions } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Video, Wind } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Get Suggestions
    </Button>
  );
}

export default function DailyTips() {
  const initialState = { message: undefined, errors: {}, data: undefined };
  const [state, dispatch] = useActionState(
    getDailyExerciseVideoSuggestions,
    initialState
  );
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
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Daily Motivation Boost
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get daily exercise and mental relaxation video suggestions tailored
            to your preferences and available time.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <form action={dispatch}>
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>
                  Help us find the perfect videos for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fitnessLevel">Fitness Level</Label>
                  <Select name="fitnessLevel" defaultValue="beginner">
                    <SelectTrigger id="fitnessLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredExerciseType">Exercise Type</Label>
                  <Select name="preferredExerciseType" defaultValue="cardio">
                    <SelectTrigger id="preferredExerciseType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="strength training">Strength</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredRelaxationType">Relaxation Type</Label>
                  <Select name="preferredRelaxationType" defaultValue="meditation">
                    <SelectTrigger id="preferredRelaxationType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="breathing exercises">Breathing</SelectItem>
                      <SelectItem value="nature sounds">Nature Sounds</SelectItem>
                      <SelectItem value="stretching">Stretching</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableTime">Available Time</Label>
                  <Select name="availableTime" defaultValue="15 minutes">
                    <SelectTrigger id="availableTime">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 minutes">15 Minutes</SelectItem>
                      <SelectItem value="30 minutes">30 Minutes</SelectItem>
                      <SelectItem value="45 minutes">45 Minutes</SelectItem>
                      <SelectItem value="1 hour">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {state.data ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Video className="h-6 w-6 text-primary" /></div>
                        <CardTitle>Exercise Video</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{state.data.exerciseVideo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {state.data.exerciseVideo.description}
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={state.data.exerciseVideo.url} target="_blank" rel="noopener noreferrer">
                        Watch Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/20 rounded-lg"><Wind className="h-6 w-6 text-accent-foreground" /></div>
                        <CardTitle>Relaxation Video</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{state.data.relaxationVideo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {state.data.relaxationVideo.description}
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={state.data.relaxationVideo.url} target="_blank" rel="noopener noreferrer">
                        Start Relaxing
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
                <Card className="md:col-span-2 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    <Sparkles className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold text-lg">Your video suggestions will appear here.</h3>
                    <p className="text-muted-foreground text-sm">Select your preferences to begin!</p>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
