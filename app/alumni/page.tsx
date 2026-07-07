import type { Metadata } from 'next';

import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import AlumniPage from '@/components/sections/alumni/AlumniPage';
import {
  ALUMNI_PAGE_KEYWORDS,
  buildAlumniCareerFieldListNode,
  buildAlumniNetworkNode,
  buildSchemaGraph,
  buildWebPageNode,
} from '@/lib/seo-schema';

const pageDescription =
  'Meet the IIC alumni network and graduate stories across technology, finance, design, and marketing, with career paths from Nepal to global workplaces.';
const ogImage =
  '/api/og?title=IIC%20Alumni%20Network&subtitle=Graduate%20Stories%20%26%20Global%20Career%20Paths&section=Itahari%20International%20College';

export const metadata: Metadata = {
  title: 'IIC Alumni Network & Graduate Stories',
  description: pageDescription,
  keywords: ALUMNI_PAGE_KEYWORDS,
  alternates: { canonical: '/alumni' },
  openGraph: {
    title: 'IIC Alumni Network & Graduate Stories | Itahari International College',
    description: pageDescription,
    url: '/alumni',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'IIC alumni network and graduate stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IIC Alumni Network & Graduate Stories',
    description: pageDescription,
    images: [ogImage],
  },
};

export default function AlumniRoutePage() {
  const alumniNetworkSchema = buildAlumniNetworkNode();
  const alumniCareerFieldsSchema = buildAlumniCareerFieldListNode();
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
            name: 'IIC Alumni Network and Graduate Stories',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/alumini/graduate.jpg',
            keywords: ALUMNI_PAGE_KEYWORDS,
            mainEntity: { '@id': alumniNetworkSchema['@id'] },
          }),
          alumniNetworkSchema,
          alumniCareerFieldsSchema,
        ])}
      />
      <AlumniPage />
    </main>
  );
}
