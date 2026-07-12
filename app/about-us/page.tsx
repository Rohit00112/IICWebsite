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
import JsonLd from '@/components/common/JsonLd';
import { ABOUT_PAGE_KEYWORDS, buildWebPageNode, withContext } from '@/lib/seo-schema';

const pageDescription = 'Learn how IIC combines London Metropolitan University standards, practical learning, and student-centred support to develop globally competitive graduates in Itahari.';

export const metadata = {
  title: 'Mission, Values & UK Partnership',
  description: pageDescription,
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: 'Mission, Values & UK Partnership | Itahari International College',
    description: pageDescription,
    url: '/about-us',
    type: 'website',
    images: [
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'Mission, values and UK partnership at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mission, Values & UK Partnership',
    description: pageDescription,
    images: ['/og/about.png'],
  },
};

export default function AboutUsPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about-us' },
  ];

  return (
    <main className="relative bg-[#0a0a0a]">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={withContext(buildWebPageNode({
          path: '/about-us',
          name: 'About Itahari International College',
          description: pageDescription,
          type: 'AboutPage',
          image: '/images/about/about-hero.JPG',
          keywords: ABOUT_PAGE_KEYWORDS,
        }))}
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
