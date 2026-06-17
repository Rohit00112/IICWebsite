import React from 'react';
import LifeHero from '@/components/sections/life-at-iic/LifeHero';
import LifeIntro from '@/components/sections/life-at-iic/LifeIntro';
import CampusGallery from '@/components/sections/life-at-iic/CampusGallery';
import StudentExperience from '@/components/sections/life-at-iic/StudentExperience';
import EventsHighlights from '@/components/sections/life-at-iic/EventsHighlights';
import CampusPictures from '@/components/sections/life-at-iic/CampusPictures';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata = {
  title: 'Life at IIC | Student Experience | Itahari International College',
  description: 'Discover student life at IIC, from campus events and practical learning to the supportive community behind #LifeAtIIC.',
  openGraph: {
    title: 'Life at Itahari International College',
    description: 'Experience the student community, events, and campus culture behind #LifeAtIIC.',
    images: [
      {
        url: '/api/og?title=Life At Itahari International College&subtitle=Experience Vibrant Campus Life&section=Student Life',
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
    { name: 'Life At Itahari International College', item: '/life-at-iic' },
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
