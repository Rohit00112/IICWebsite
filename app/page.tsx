import HeroSection from "@/components/sections/HeroSection";
import StatsStrip from "@/components/sections/StatsStrip";
import Preloader from "@/components/layout/Preloader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Preloader />
      <main className="flex-grow">
        <HeroSection />
        <StatsStrip />
      </main>
    </div>
  );
}
