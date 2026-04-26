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
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata = {
  title: 'Our Mission & UK Partnership | Itahari International College',
  description: 'Learn about our partnership with London Metropolitan University, our mission for world-class education, and the team driving excellence at IIC Itahari.',
};

export default function AboutUsPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about-us' },
  ];

  return (
    <main className="relative bg-[#0a0a0a]">
      <BreadcrumbSchema items={breadcrumbs} />
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
