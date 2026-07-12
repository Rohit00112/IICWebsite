import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import OurInfrastructurePage from '@/components/sections/our-infrastructure/OurInfrastructurePage';
import {
  buildInfrastructureFacilityListNode,
  buildSchemaGraph,
  buildWebPageNode,
  INFRASTRUCTURE_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription =
  'Explore IIC campus infrastructure in Itahari: computer labs, library, lecture theatres, seminar halls, cafeteria, academic blocks, Wi-Fi, and smart facilities.';
const ogImage = '/og/infrastructure.png';

export const metadata: Metadata = {
  title: 'Campus Infrastructure & Facilities in Itahari',
  description: pageDescription,
  alternates: { canonical: '/our-infrastructure' },
  openGraph: {
    title: 'Campus Infrastructure & Facilities in Itahari | IIC',
    description: pageDescription,
    url: '/our-infrastructure',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Campus infrastructure and facilities at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Infrastructure & Facilities in Itahari',
    description: pageDescription,
    images: [ogImage],
  },
};

export default function InfrastructureRoutePage() {
  const facilityListSchema = buildInfrastructureFacilityListNode();
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Our Infrastructure', item: '/our-infrastructure' },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/our-infrastructure',
            name: 'Campus Infrastructure and Facilities at Itahari International College',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/our-infrastructure/infra.png',
            keywords: INFRASTRUCTURE_PAGE_KEYWORDS,
            mainEntity: { '@id': facilityListSchema['@id'] },
          }),
          facilityListSchema,
        ])}
      />
      <OurInfrastructurePage />
    </main>
  );
}
