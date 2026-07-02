import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import ScrollScaleVideo from "@/components/sections/home/ScrollScaleVideo";
import ProgrammesSection from "@/components/sections/home/ProgrammesSection";
import Preloader from "@/components/layout/Preloader";
import { Metadata } from "next";
import GEOSection from "@/components/sections/home/GEOSection";
import HomePopup from "@/components/sections/home/HomePopup";
import { getHomePopupSettings } from "@/lib/home-popup";
import JsonLd from "@/components/common/JsonLd";
import { buildBreadcrumbListNode, buildSchemaGraph, buildWebPageNode, HOME_PAGE_KEYWORDS } from "@/lib/seo-schema";

const PartnerSection = dynamic(() => import("@/components/sections/home/PartnerSection"), { ssr: true });
const ScholarshipSection = dynamic(() => import("@/components/sections/home/ScholarshipSection"), { ssr: true });
const LifestyleSection = dynamic(() => import("@/components/sections/home/LifestyleSection"), { ssr: true });
const StudentStories = dynamic(() => import("@/components/sections/home/StudentStories"), { ssr: true });
const InnovationLab = dynamic(() => import("@/components/sections/home/InnovationLab"), { ssr: true });
const IngSection = dynamic(() => import("@/components/sections/home/IngSection"), { ssr: true });
const ProspectusSection = dynamic(() => import("@/components/sections/home/ProspectusSection"), { ssr: true });

const pageDescription = "Developing impactful industry-ready graduates through UK-awarded IT and Business programmes in partnership with London Metropolitan University.";

export const metadata: Metadata = {
  title: "Itahari International College | UK Degrees in IT & Business",
  description: pageDescription,
  keywords: HOME_PAGE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Itahari International College | UK Degrees in IT & Business",
    description: pageDescription,
    url: "/",
    type: "website",
  },
};

export default async function Home() {
  const popupSettings = await getHomePopupSettings();
  const breadcrumbs = [{ name: 'Home', item: '/' }];

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/',
            name: 'Itahari International College',
            description: pageDescription,
            image: '/images/home/hero.webp',
            keywords: HOME_PAGE_KEYWORDS,
          }),
          buildBreadcrumbListNode(breadcrumbs),
        ])}
      />
      <Preloader />
      <HomePopup settings={popupSettings} />
      <HeroSection />
      <AboutSection />
      <ScrollScaleVideo />
      <ProgrammesSection />
      <PartnerSection />
      <ScholarshipSection />
      <LifestyleSection />
      <StudentStories />
      <InnovationLab />
      <IngSection />
      <GEOSection />
      <ProspectusSection />
    </>
  );
}
