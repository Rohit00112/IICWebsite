import Link from 'next/link';

import EventGalleryTable from '@/components/admin/EventGalleryTable';
import { getAllEventGalleries } from '@/lib/event-galleries';

export const dynamic = 'force-dynamic';


export default async function AdminGalleriesPage() {
  const galleries = await getAllEventGalleries();
  const published = galleries.filter((gallery) => gallery.status === 'published').length;
  const photoCount = galleries.reduce((total, gallery) => total + gallery.images.length, 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-sora text-4xl font-black tracking-tight text-[#1A2B56]">Event Galleries</h1>
          <p className="mt-2 font-medium text-gray-500">Manage public event pages, event years, cover images, and photo collections.</p>
        </div>
        <Link
          href="/admin/galleries/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#21409A] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#21409A]/20 hover:bg-[#1A2B56]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Create Gallery
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Total galleries" value={galleries.length} color="text-[#1A2B56]" />
        <Stat label="Published" value={published} color="text-[#3f7e28]" />
        <Stat label="Uploaded photos" value={photoCount} color="text-[#21409A]" />
      </div>

      <EventGalleryTable initialGalleries={galleries} />
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
      <p className={`mt-3 font-sora text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}
