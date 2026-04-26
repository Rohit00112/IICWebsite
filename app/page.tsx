import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import ProgrammesSection from "@/components/sections/home/ProgrammesSection";
import Preloader from "@/components/layout/Preloader";
import { Metadata } from "next";
import GEOSection from "@/components/sections/home/GEOSection";

const PartnerSection = dynamic(() => import("@/components/sections/home/PartnerSection"), { ssr: true });
const LifestyleSection = dynamic(() => import("@/components/sections/home/LifestyleSection"), { ssr: true });
const StudentStories = dynamic(() => import("@/components/sections/home/StudentStories"), { ssr: true });
const InnovationLab = dynamic(() => import("@/components/sections/home/InnovationLab"), { ssr: true });
const IngSection = dynamic(() => import("@/components/sections/home/IngSection"), { ssr: true });
const ProspectusSection = dynamic(() => import("@/components/sections/home/ProspectusSection"), { ssr: true });

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
