import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgrammesSection from "@/components/sections/ProgrammesSection";
import PartnerSection from "@/components/sections/PartnerSection";
import LifestyleSection from "@/components/sections/LifestyleSection";
import StudentStories from "@/components/sections/StudentStories";
import InnovationLab from "@/components/sections/InnovationLab";
import IngSection from "@/components/sections/IngSection";
import ProspectusSection from "@/components/sections/ProspectusSection";
import Preloader from "@/components/layout/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <HeroSection />
      <AboutSection />
      <ProgrammesSection />
      <PartnerSection />
      <LifestyleSection />
      <StudentStories />
      <InnovationLab />
      <IngSection />
      <ProspectusSection />
    </>
  );
}
