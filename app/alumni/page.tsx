import type { Metadata } from 'next';

import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import AlumniPage from '@/components/sections/alumni/AlumniPage';
import {
  ALUMNI_PAGE_KEYWORDS,
  buildSchemaGraph,
  buildWebPageNode,
} from '@/lib/seo-schema';

const pageDescription =
  'Explore the Itahari International College alumni network — a global community of graduates shaping industries, driving innovation, and building a lasting legacy.';

export const metadata: Metadata = {
  title: 'Alumni Network',
  description: pageDescription,
  keywords: ALUMNI_PAGE_KEYWORDS,
  alternates: { canonical: '/alumni' },
  openGraph: {
    title: 'Alumni Network | Itahari International College',
    description: pageDescription,
    url: '/alumni',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Alumni Network&subtitle=Our Alumni, Our Pride&section=Itahari International College',
        width: 1200,
        height: 630,
        alt: 'Alumni Network at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alumni Network',
    description: pageDescription,
    images: [
      '/api/og?title=Alumni Network&subtitle=Our Alumni, Our Pride&section=Itahari International College',
    ],
  },
};

export default function AlumniRoutePage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Alumni Network', item: '/alumni' },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/alumni',
            name: 'Alumni Network',
            description: pageDescription,
            type: 'WebPage',
            image: '/images/about/about-hero.JPG',
            keywords: ALUMNI_PAGE_KEYWORDS,
          }),
        ])}
      />
      <AlumniPage />
    </main>
  );
}
