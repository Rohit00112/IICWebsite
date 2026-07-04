import React from 'react';
import LifeHero from '@/components/sections/life-at-iic/LifeHero';
import LifeIntro from '@/components/sections/life-at-iic/LifeIntro';
import CollegeGallery from '@/components/sections/life-at-iic/CollegeGallery';
import StudentExperience from '@/components/sections/life-at-iic/StudentExperience';
import EventsHighlights from '@/components/sections/life-at-iic/EventsHighlights';
import CollegePictures from '@/components/sections/life-at-iic/CollegePictures';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import { getPublishedEventGalleryArchives } from '@/lib/event-galleries';
import {
  buildEventGalleryItemListNode,
  buildSchemaGraph,
  buildWebPageNode,
  LIFE_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription = 'Discover student life at IIC, from college events and practical learning to the supportive community behind #LifeAtIIC.';

export const metadata = {
  title: 'Life at IIC | Student Experience',
  description: pageDescription,
  keywords: LIFE_PAGE_KEYWORDS,
  alternates: { canonical: '/life-at-iic' },
  openGraph: {
    title: 'Life at Itahari International College',
    description: 'Experience the student community, events, and college culture behind #LifeAtIIC.',
    url: '/life-at-iic',
    images: [
      {
        url: '/api/og?title=Life At Itahari International College&subtitle=Experience Vibrant College Life&section=Student Life',
        width: 1200,
        height: 630,
        alt: 'Life At Itahari International College',
      },
    ],
  },
};

export default async function LifeAtIicPage() {
  const galleries = await getPublishedEventGalleryArchives();
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Life At Itahari International College', item: '/life-at-iic' },
  ];

  return (
    <main className="min-h-screen bg-black">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/life-at-iic',
            name: 'Life at Itahari International College',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/lifestyle/lifestyle-hero.JPG',
            keywords: LIFE_PAGE_KEYWORDS,
          }),
          buildEventGalleryItemListNode(galleries),
        ])}
      />
      <LifeHero />
      <LifeIntro />
      <CollegeGallery />
      <StudentExperience />
      <EventsHighlights galleries={galleries} />
      <CollegePictures />
    </main>
  );
}
