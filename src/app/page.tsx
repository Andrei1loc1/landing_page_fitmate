import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import StatsPreview from "@/components/sections/stats-preview";
import StepGoal from "@/components/sections/step-goal";
import DailyTips from "@/components/sections/daily-tips";
import Download from "@/components/sections/download";
import AppPreview from "@/components/sections/app-preview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <AppPreview />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
