"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function CalorieCalculator() {
  const [duration, setDuration] = useState(30);
  const caloriesPerMinute = 5;
  const caloriesBurned = duration * caloriesPerMinute;

  return (
    <Card className="p-6 bg-secondary/50 border-none shadow-inner">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="duration" className="text-sm font-medium">
            Activity Duration
          </Label>
          <span className="text-sm font-semibold">{duration} minutes</span>
        </div>
        <Slider
          id="duration"
          min={10}
          max={120}
          step={5}
          value={[duration]}
          onValueChange={(value) => setDuration(value[0])}
        />
        <div className="text-center pt-2">
          <p className="text-4xl font-bold text-primary">{caloriesBurned}</p>
          <p className="text-sm font-medium text-muted-foreground">
            Estimated Calories Burned
          </p>
        </div>
      </div>
    </Card>
  );
}
