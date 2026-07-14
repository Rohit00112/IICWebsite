import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import ScholarshipsClient from '@/components/sections/scholarships/ScholarshipsClient';
import { getPublishedScholarshipBatches } from '@/lib/scholarships';
import JsonLd from '@/components/common/JsonLd';
import {
  absoluteAssetUrl,
  buildSchemaGraph,
  buildScholarshipListNode,
  buildWebPageNode,
  SCHOLARSHIPS_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

export const dynamic = 'force-dynamic';

const pageDescription = 'Explore AAA and ING postgraduate scholarship opportunities at Itahari International College, including yearwise recipient stories and award archives.';

export const metadata: Metadata = {
  title: 'Scholarships at IIC',
  description: pageDescription,
  alternates: { canonical: '/scholarship' },
  openGraph: {
    title: 'Scholarships at Itahari International College',
    description: 'Recognition for academic excellence, attendance, attitude, and outstanding graduate achievement.',
    url: '/scholarship',
    images: [
      {
        url: absoluteAssetUrl('/og/scholarships.png'),
        width: 1200,
        height: 630,
        alt: 'Scholarships at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scholarships at IIC',
    description: pageDescription,
    images: [absoluteAssetUrl('/og/scholarships.png')],
  },
};

export default async function ScholarshipsPage() {
  const batches = await getPublishedScholarshipBatches();

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Scholarships', item: '/scholarship' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/scholarship',
            name: 'Scholarships at Itahari International College',
            description: pageDescription,
            image: absoluteAssetUrl('/og/scholarships.png'),
            keywords: SCHOLARSHIPS_PAGE_KEYWORDS,
          }),
          buildScholarshipListNode(batches),
        ])}
      />
      <ScholarshipsClient batches={batches} />
    </>
  );
}
