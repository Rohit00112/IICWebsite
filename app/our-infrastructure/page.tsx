import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import OurInfrastructurePage from '@/components/sections/our-infrastructure/OurInfrastructurePage';
import {
  buildSchemaGraph,
  buildWebPageNode,
  INFRASTRUCTURE_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription =
  'Explore IIC infrastructure, including modern labs, library resources, seminar halls, cafeteria spaces, and academic blocks designed for practical learning in Itahari.';

export const metadata: Metadata = {
  title: 'Our Infrastructure & Campus Facilities',
  description: pageDescription,
  keywords: INFRASTRUCTURE_PAGE_KEYWORDS,
  alternates: { canonical: '/our-infrastructure' },
  openGraph: {
    title: 'Our Infrastructure & Campus Facilities | Itahari International College',
    description: pageDescription,
    url: '/our-infrastructure',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Our Infrastructure&subtitle=Modern Campus Facilities&section=Itahari International College',
        width: 1200,
        height: 630,
        alt: 'Our Infrastructure at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Infrastructure & Campus Facilities',
    description: pageDescription,
    images: ['/api/og?title=Our Infrastructure&subtitle=Modern Campus Facilities&section=Itahari International College'],
  },
};

export default function InfrastructureRoutePage() {
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
            name: 'Our Infrastructure and Campus Facilities',
            description: pageDescription,
            type: 'WebPage',
            image: '/images/our-infrastructure/infra.png',
            keywords: INFRASTRUCTURE_PAGE_KEYWORDS,
          }),
        ])}
      />
      <OurInfrastructurePage />
    </main>
  );
}
