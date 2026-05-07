import React from 'react';
import LifeHero from '@/components/sections/life-at-iic/LifeHero';
import LifeIntro from '@/components/sections/life-at-iic/LifeIntro';
import CampusGallery from '@/components/sections/life-at-iic/CampusGallery';
import StudentExperience from '@/components/sections/life-at-iic/StudentExperience';
import EventsHighlights from '@/components/sections/life-at-iic/EventsHighlights';
import CampusPictures from '@/components/sections/life-at-iic/CampusPictures';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata = {
  title: 'Vibrant Campus Life in Itahari | Student Experience | IIC',
  description: 'Discover the vibrant community, modern facilities, and unique student experiences at Itahari International College.',
  openGraph: {
    title: 'Life At IIC - Experience Vibrant Campus Life',
    description: 'Experience the vibrant campus life at Itahari International College.',
    images: [
      {
        url: '/api/og?title=Life At IIC&subtitle=Experience Vibrant Campus Life&section=Student Life',
        width: 1200,
        height: 630,
        alt: 'Life At Itahari International College',
      },
    ],
  },
};

export default function LifeAtIicPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Life At IIC', item: '/life-at-iic' },
  ];

  return (
    <main className="min-h-screen bg-black">
      <BreadcrumbSchema items={breadcrumbs} />
      <LifeHero />
      <LifeIntro />
      <CampusGallery />
      <StudentExperience />
      <EventsHighlights />
      <CampusPictures />
    </main>
  );
}
