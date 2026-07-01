import React from 'react';
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
  title: 'Mission, Values & UK Partnership | Itahari International College',
  description: 'Learn how IIC combines London Metropolitan University standards, practical learning, and student-centred support to develop globally competitive graduates in Itahari.',
};

export default function AboutUsPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about-us' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Itahari International College',
    description: 'Learn how IIC combines London Metropolitan University standards, practical learning, and student-centred support to develop globally competitive graduates in Itahari.',
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: 'Itahari International College',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iic.edu.np/images/common/iic_logo.png'
      }
    }
  };

  return (
    <main className="relative bg-[#0a0a0a]">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
