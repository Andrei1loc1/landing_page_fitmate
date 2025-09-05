"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const appScreenshots = [
  {
    src: "https://drive.google.com/uc?export=view&id=1XQxPn7yDDm2S-D-M1QKv3RH31L1lzuFu",
    alt: "App Screenshot 1",
    width: 400,
    height: 866,
    "data-ai-hint": "app screenshot",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1XLVECJZYMQD8ENFYbC_u2Ir5P_rFYYS0",
    alt: "App Screenshot 2",
    width: 400,
    height: 866,
    "data-ai-hint": "app screenshot",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1XKTIoV-SWQccjfkTVIU7-EodBFnsdKGT",
    alt: "App Screenshot 3",
    width: 400,
    height: 866,
    "data-ai-hint": "app screenshot",
  },
    {
        src: "https://drive.google.com/uc?export=view&id=1XJdyDBRN21uiQRXBxmjSrVi_Ir1FVH12",
        alt: "App Screenshot 4",
        width: 400,
        height: 866,
        "data-ai-hint": "app screenshot",
    },
  {
    src: "https://drive.google.com/uc?export=view&id=1XFmNkG9AP7FCFpBP9x3DyC8swSTUTjei",
    alt: "App Screenshot 5",
    width: 400,
    height: 866,
    "data-ai-hint": "app screenshot",
  },
];

export default function AppPreview() {
  return (
    <section className="py-16 sm:py-24  bg-gradient-to-b from-background to-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Explore the App
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Take a look at some of the key features that will help you on your
            fitness journey.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto"
        >
          <CarouselContent>
            {appScreenshots.map((screenshot, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    className="rounded-3xl shadow-2xl"
                    data-ai-hint={screenshot["data-ai-hint"]}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
