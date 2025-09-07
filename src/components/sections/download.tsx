import Image from "next/image";
import { Button } from "@/components/ui/button";

const AndroidIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6">
        <path d="M16 8.81a4.24 4.24 0 0 0-8 0c0 1.6.83 3 2.05 3.82L8 16h8l-2.05-3.37c1.22-.83 2.05-2.22 2.05-3.82Z"/>
        <path d="M8.3 4.19a8.55 8.55 0 0 1 7.4 0"/>
        <path d="m9 16 1 4"/>
        <path d="m15 16-1 4"/>
        <path d="M5.1 8a8.55 8.55 0 0 0 0 8"/>
        <path d="M18.9 8a8.55 8.55 0 0 1 0 8"/>
        <path d="M7.1 5.95A4.24 4.24 0 0 0 6 8.81"/>
        <path d="M16.9 5.95A4.24 4.24 0 0 1 18 8.81"/>
    </svg>
)

export default function Download() {
  return (
    <section id="download" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-secondary/50"></div>
        <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                        Get FitMate Today!
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                        Start your fitness journey now. Download the FitMate app directly to your Android device.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" className="h-14 text-lg" asChild>
                            <a href="https://mega.nz/file/mxgn1bzT#F2GWZ2CQ3QQfgj5idKpLO8--5rdOoUl4X8a09hgdhhs">
                                <AndroidIcon />
                                Download for Android
                            </a>
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                        Compatible with Android 8.0 and above.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="https://drive.google.com/uc?export=view&id=1XciWBNl5aDt9PYrYkBfEHq1rhR-jwUr4"
                        alt="FitMate app screenshot"
                        width={300}
                        height={600}
                        className="rounded-3xl shadow-2xl transform rotate-3 border-2"
                        data-ai-hint="app screenshot"
                    />
                </div>
            </div>
        </div>
    </section>
  );
}
