import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="https://drive.google.com/uc?export=view&id=1IpVYmtwhivomrYV5X-wHzTynWI9_zi6_"
        alt="Abstract fitness background"
        fill
        sizes="100vw"
        className="object-cover"
        data-ai-hint="fitness abstract"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl text-center lg:text-left text-foreground">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Ultimate Fitness Companion
            </h1>
            <p className="mt-4 max-w-lg text-lg text-foreground/80 md:text-xl">
              Track your progress, get personalized goals, and stay motivated
              every day with FitMate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start sm:justify-start">
              <Button size="lg" asChild className="w-fit sm:w-auto">
                <a href="#download">
                  <Download className="mr-2" /> Download Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-fit sm:w-auto">
                <a href="#features">
                  Learn More <MoveRight className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
