import { notFound } from 'next/navigation';

import EventGalleryForm from '@/components/admin/EventGalleryForm';
import { getAllEventGalleries, getEventGalleryById } from '@/lib/event-galleries';

export const dynamic = 'force-dynamic';


export default async function EditEventGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gallery = await getEventGalleryById(id);

  if (!gallery) notFound();

  const eventYears = (await getAllEventGalleries())
    .filter((item) => item.title.trim().toLowerCase() === gallery.title.trim().toLowerCase());

  return <EventGalleryForm gallery={gallery} eventYears={eventYears} />;
}
