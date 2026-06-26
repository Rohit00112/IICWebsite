import { getPublishedEventGalleryArchives } from '@/lib/event-galleries';
import EventsHighlightsClient from './EventsHighlightsClient';

export default async function EventsHighlights() {
  const galleries = await getPublishedEventGalleryArchives();
  return <EventsHighlightsClient galleries={galleries} />;
}
