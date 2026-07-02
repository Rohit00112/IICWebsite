import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import ScholarshipsClient from '@/components/sections/scholarships/ScholarshipsClient';
import { getPublishedScholarshipBatches } from '@/lib/scholarships';
import JsonLd from '@/components/common/JsonLd';
import {
  buildSchemaGraph,
  buildScholarshipListNode,
  buildWebPageNode,
} from '@/lib/seo-schema';

const pageDescription = 'Explore AAA and ING postgraduate scholarship opportunities at Itahari International College, including yearwise recipient stories and award archives.';

export const metadata: Metadata = {
  title: 'Scholarships at IIC | Itahari International College',
  description: pageDescription,
  keywords: ['IIC scholarships', 'Itahari International College scholarship', 'AAA Scholarship Nepal', 'ING Postgraduate Scholarship'],
  alternates: { canonical: '/scholarships' },
  openGraph: {
    title: 'Scholarships at Itahari International College',
    description: 'Recognition for academic excellence, attendance, attitude, and outstanding graduate achievement.',
    url: '/scholarships',
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

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/scholarships',
            name: 'Scholarships at Itahari International College',
            description: pageDescription,
            image: '/api/og?title=Scholarships%20at%20IIC&subtitle=Recognition%20that%20moves%20students%20forward&section=Scholarships',
          }),
          buildScholarshipListNode(batches),
        ])}
      />
      <ScholarshipsClient batches={batches} />
    </>
  );
}
