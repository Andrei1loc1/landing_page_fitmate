import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {Flame, Footprints, Dumbbell, Bed, Timer, Droplet} from "lucide-react";
import CalorieCalculator from "./calorie-calculator";

const features = [
  {
    icon: <Flame className="h-8 w-8 text-primary" />,
    title: "Calorie Tracking",
    description: "Monitor your daily calorie burn with our simple interactive tool.",
    component: <CalorieCalculator />,
  },
  {
    icon: <Footprints className="h-8 w-8 text-primary" />,
    title: "Distance Tracking",
    description: "Keep an eye on the distance you cover, whether you're walking, running, or cycling.",
  },
    {
        icon: <Timer className="h-8 w-8 text-primary" />,
        title: "Active Time",
        description: "Track the total duration of your daily activities and stay consistent with your movement goals.",
    },
    {
        icon: <Droplet className="h-8 w-8 text-primary" />,
        title: "Water Intake",
        description: "Log your daily water consumption to stay hydrated and support overall health.",
    },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            All-in-One Fitness Tracking
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            FitMate provides all the tools you need to take control of your
            health and fitness journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                {feature.component}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
