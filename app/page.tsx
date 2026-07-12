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
const StudentStories = dynamic(() => import("@/components/sections/home/StudentStories"), { ssr: true });
const InnovationLab = dynamic(() => import("@/components/sections/home/InnovationLab"), { ssr: true });
const IngSection = dynamic(() => import("@/components/sections/home/IngSection"), { ssr: true });
const ProspectusSection = dynamic(() => import("@/components/sections/home/ProspectusSection"), { ssr: true });

const pageDescription = "Study UK-awarded IT and Business degrees at Itahari International College in Nepal, delivered with London Metropolitan University to build confident, industry-ready graduates.";

export const metadata: Metadata = {
  title: {
    absolute: "Itahari International College | UK Degrees in IT & Business",
  },
  description: pageDescription,
  alternates: {
    canonical: "/",
    languages: { "en-NP": "/" },
  },
  openGraph: {
    title: "Itahari International College | UK Degrees in IT & Business",
    description: pageDescription,
    url: "/",
    type: "website",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Itahari International College UK degrees in IT and Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Itahari International College | UK Degrees in IT & Business",
    description: pageDescription,
    images: ["/og/home.png"],
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
      <StudentStories />
      <InnovationLab />
      <IngSection />
      <GEOSection />
      <ProspectusSection />
    </>
  );
}
