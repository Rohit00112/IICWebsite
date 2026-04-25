import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import ProgrammesSection from "@/components/sections/home/ProgrammesSection";
import PartnerSection from "@/components/sections/home/PartnerSection";
import LifestyleSection from "@/components/sections/home/LifestyleSection";
import StudentStories from "@/components/sections/home/StudentStories";
import InnovationLab from "@/components/sections/home/InnovationLab";
import IngSection from "@/components/sections/home/IngSection";
import ProspectusSection from "@/components/sections/home/ProspectusSection";
import Preloader from "@/components/layout/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itahari International College | Excellence in IT & Business",
  description: "Welcome to Itahari International College. Explore our world-class BIT and BBA programs, state-of-the-art facilities, and vibrant campus life.",
};

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
