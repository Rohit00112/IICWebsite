import React from 'react';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/sections/about-us/AboutHero';
import MissionVision from '@/components/sections/about-us/MissionVision';
import IngSection from '@/components/sections/about-us/IngSection';
import ExcellenceJourney from '@/components/sections/about-us/ExcellenceJourney';
import Leadership from '@/components/sections/about-us/Leadership';
import WhyChooseIIC from '@/components/sections/about-us/WhyChooseIIC';
import InnovationGrid from '@/components/sections/about-us/InnovationGrid';
import ExperienceCTA from '@/components/sections/about-us/ExperienceCTA';

export const metadata = {
  title: 'About Us | Itahari International College',
  description: 'Learn about our mission, vision, and the team behind Itahari International College.',
};

export default function AboutUsPage() {
  return (
    <main className="relative bg-[#0a0a0a]">
      <AboutHero />
      <MissionVision />
      <IngSection />
      <ExcellenceJourney />
      <Leadership />
      <WhyChooseIIC />
      <InnovationGrid />
      <ExperienceCTA />
    </main>
  );
}
