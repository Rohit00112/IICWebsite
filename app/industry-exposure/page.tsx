import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import IndustryExposurePage from '@/components/sections/industry-exposure/IndustryExposurePage';
import {
  buildSchemaGraph,
  buildWebPageNode,
  INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription =
  'Discover IIC industry exposure through career development, employer connections, job fair preparation, mentoring, global learning, and practical workplace insight.';

export const metadata: Metadata = {
  title: 'Industry Exposure & Career Readiness',
  description: pageDescription,
  keywords: INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
  alternates: { canonical: '/industry-exposure' },
  openGraph: {
    title: 'Industry Exposure & Career Readiness | Itahari International College',
    description: pageDescription,
    url: '/industry-exposure',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Industry Exposure&subtitle=Career-Ready Learning&section=Itahari International College',
        width: 1200,
        height: 630,
        alt: 'Industry Exposure at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry Exposure & Career Readiness',
    description: pageDescription,
    images: ['/api/og?title=Industry Exposure&subtitle=Career-Ready Learning&section=Itahari International College'],
  },
};

export default function IndustryExposureRoutePage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Industry Exposure', item: '/industry-exposure' },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/industry-exposure',
            name: 'Industry Exposure and Career Readiness',
            description: pageDescription,
            type: 'WebPage',
            image: '/images/about/career.JPG',
            keywords: INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
          }),
        ])}
      />
      <IndustryExposurePage />
    </main>
  );
}
