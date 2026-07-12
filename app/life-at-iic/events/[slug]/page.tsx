import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublishedEventGalleryArchiveBySlug } from '@/lib/event-galleries';
import EventGalleryPage from '@/components/sections/life-at-iic/EventGalleryPage';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import {
  buildImageGalleryNode,
  buildSchemaGraph,
  buildWebPageNode,
  LIFE_PAGE_KEYWORDS,
  mergeKeywords,
} from '@/lib/seo-schema';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getPublishedEventGalleryArchiveBySlug(slug);
  if (!gallery) {
    return {
      title: 'Gallery Not Found',
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${gallery.title} Gallery`,
    description: gallery.summary,
    alternates: { canonical: `/life-at-iic/events/${slug}` },
    openGraph: {
      title: `${gallery.title} Gallery`,
      description: gallery.summary,
      url: `/life-at-iic/events/${slug}`,
      images: [gallery.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${gallery.title} Gallery`,
      description: gallery.summary,
      images: [gallery.coverImage],
    },
  };
}

export default async function EventGalleryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = await getPublishedEventGalleryArchiveBySlug(slug);
  if (!gallery) notFound();

  const gallerySchema = buildImageGalleryNode(gallery);
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Life at IIC', item: '/life-at-iic' },
    { name: `${gallery.title} Gallery`, item: `/life-at-iic/events/${gallery.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: `/life-at-iic/events/${gallery.slug}`,
            name: `${gallery.title} Gallery`,
            description: gallery.summary,
            image: gallery.coverImage,
            keywords: mergeKeywords(LIFE_PAGE_KEYWORDS, [gallery.title, `${gallery.title} photos`]),
            mainEntity: { '@id': gallerySchema['@id'] },
          }),
          gallerySchema,
        ])}
      />
      <EventGalleryPage gallery={gallery} />
    </>
  );
}
