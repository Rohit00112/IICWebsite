import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import IndustryExposurePage from '@/components/sections/industry-exposure/IndustryExposurePage';
import {
  absoluteAssetUrl,
  buildIndustryExposureItemListNode,
  buildSchemaGraph,
  buildWebPageNode,
  INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription =
  'See how IIC builds career readiness through international exposure, job fairs, industry visits, employer networking, mentoring, mock interviews, and projects.';
const ogImage = absoluteAssetUrl('/og/industry-exposure.png');

export const metadata: Metadata = {
  title: 'Industry Exposure & Placement Support in Itahari',
  description: pageDescription,
  alternates: { canonical: '/industry-exposure' },
  openGraph: {
    title: 'Industry Exposure & Placement Support in Itahari | IIC',
    description: pageDescription,
    url: '/industry-exposure',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Industry exposure and placement support at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry Exposure & Placement Support in Itahari',
    description: pageDescription,
    images: [ogImage],
  },
};

export default function IndustryExposureRoutePage() {
  const exposureListSchema = buildIndustryExposureItemListNode();
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
            name: 'Industry Exposure and Placement Support at Itahari International College',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/industry-exposure/exposure-banner.jpg',
            keywords: INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
            mainEntity: { '@id': exposureListSchema['@id'] },
          }),
          exposureListSchema,
        ])}
      />
      <IndustryExposurePage />
    </main>
  );
}
