import EventGalleryForm from '@/components/admin/EventGalleryForm';

export default async function NewEventGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; year?: string }>;
}) {
  const { event, year } = await searchParams;
  const parsedYear = Number(year);

  return (
    <EventGalleryForm
      initialTitle={event?.trim() || undefined}
      initialYear={Number.isInteger(parsedYear) && parsedYear >= 2000 && parsedYear <= 2100 ? parsedYear : undefined}
    />
  );
}
