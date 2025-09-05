"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          aria-label="FitMate Home"
        >
          <Dumbbell className="h-6 w-6" aria-hidden="true" />
          <span className="font-bold font-headline text-lg sm:text-xl inline-block">
            FitMate
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button asChild>
              <a href="#download">
                <Download className="mr-2 h-4 w-4" />
                Download APK
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
