import { getPublishedEventGalleryArchives } from '@/lib/event-galleries';
import type { EventGalleryArchive } from '@/lib/event-galleries';
import EventsHighlightsClient from './EventsHighlightsClient';

export default async function EventsHighlights({ galleries }: { galleries?: EventGalleryArchive[] }) {
  const eventGalleries = galleries || await getPublishedEventGalleryArchives();
  return <EventsHighlightsClient galleries={eventGalleries} />;
}
