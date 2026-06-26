import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublishedEventGalleryArchiveBySlug } from '@/lib/event-galleries';
import EventGalleryPage from '@/components/sections/life-at-iic/EventGalleryPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getPublishedEventGalleryArchiveBySlug(slug);
  if (!gallery) return { title: 'Gallery Not Found' };

  return {
    title: `${gallery.title} Gallery | Itahari International College`,
    description: gallery.summary,
    openGraph: {
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
  return <EventGalleryPage gallery={gallery} />;
}
