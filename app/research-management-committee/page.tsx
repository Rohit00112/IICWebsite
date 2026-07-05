import type { Metadata } from 'next';

import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import RmcPage from '@/components/sections/research-management-committee/RmcPage';
import {
  buildSchemaGraph,
  buildWebPageNode,
  RMC_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription =
  'Learn about the Research Management Committee at Itahari International College, supporting ethical research, academic quality, faculty scholarship, and student inquiry.';

export const metadata: Metadata = {
  title: 'Research Management Committee',
  description: pageDescription,
  keywords: RMC_PAGE_KEYWORDS,
  alternates: { canonical: '/research-management-committee' },
  openGraph: {
    title: 'Research Management Committee | Itahari International College',
    description: pageDescription,
    url: '/research-management-committee',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Research Management Committee&subtitle=Ethical Inquiry and Academic Quality&section=Itahari International College',
        width: 1200,
        height: 630,
        alt: 'Research Management Committee at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Management Committee',
    description: pageDescription,
    images: [
      '/api/og?title=Research Management Committee&subtitle=Ethical Inquiry and Academic Quality&section=Itahari International College',
    ],
  },
};

export default function ResearchManagementCommitteeRoutePage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Research Management Committee', item: '/research-management-committee' },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/research-management-committee',
            name: 'Research Management Committee',
            description: pageDescription,
            type: 'WebPage',
            image: '/images/lifestyle/research.JPG',
            keywords: RMC_PAGE_KEYWORDS,
          }),
        ])}
      />
      <RmcPage />
    </main>
  );
}
