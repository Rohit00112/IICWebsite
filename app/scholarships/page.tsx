import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import ScholarshipsClient from '@/components/sections/scholarships/ScholarshipsClient';
import { getPublishedScholarshipBatches } from '@/lib/scholarships';

export const metadata: Metadata = {
  title: 'Scholarships at IIC | Itahari International College',
  description: 'Explore AAA and ING postgraduate scholarship opportunities at Itahari International College, including yearwise recipient stories and award archives.',
  keywords: ['IIC scholarships', 'Itahari International College scholarship', 'AAA Scholarship Nepal', 'ING Postgraduate Scholarship'],
  openGraph: {
    title: 'Scholarships at Itahari International College',
    description: 'Recognition for academic excellence, attendance, attitude, and outstanding graduate achievement.',
    images: [
      {
        url: '/api/og?title=Scholarships%20at%20IIC&subtitle=Recognition%20that%20moves%20students%20forward&section=Scholarships',
        width: 1200,
        height: 630,
        alt: 'Scholarships at Itahari International College',
      },
    ],
  },
};

export default async function ScholarshipsPage() {
  const batches = await getPublishedScholarshipBatches();

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Scholarships', item: '/scholarships' },
  ];

  const scholarshipJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Scholarships at Itahari International College',
    description: metadata.description,
    url: 'https://iic.edu.np/scholarships',
    provider: {
      '@id': 'https://iic.edu.np/#college',
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarshipJsonLd) }}
      />
      <ScholarshipsClient batches={batches} />
    </>
  );
}
