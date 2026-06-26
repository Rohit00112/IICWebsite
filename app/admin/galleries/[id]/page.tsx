import { notFound } from 'next/navigation';
import EventGalleryForm from '@/components/admin/EventGalleryForm';
import { getEventGalleryById } from '@/lib/event-galleries';

export default async function EditEventGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gallery = await getEventGalleryById(id);

  if (!gallery) notFound();

  return <EventGalleryForm gallery={gallery} />;
}
