'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toSafeImageSrc } from '@/lib/image-source';
import type { EventGalleryItem } from '@/lib/event-galleries';

export default function EventGalleryTable({ initialGalleries }: { initialGalleries: EventGalleryItem[] }) {
  const [galleries, setGalleries] = useState(initialGalleries);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const deleteGallery = async (gallery: EventGalleryItem) => {
    if (!confirm(`Delete ${gallery.title} (${gallery.year})? This cannot be undone.`)) return;

    setDeletingId(gallery.id);
    try {
      const response = await fetch(`/api/galleries/${gallery.id}`, { method: 'DELETE' });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        alert(body?.error || 'Failed to delete gallery.');
        return;
      }

      setGalleries((items) => items.filter((item) => item.id !== gallery.id));
      router.refresh();
    } catch (error) {
      console.error('Error deleting event gallery:', error);
      alert('An error occurred while deleting the gallery.');
    } finally {
      setDeletingId(null);
    }
  };

  if (galleries.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#21409A]">No event galleries</p>
        <h2 className="mt-3 text-3xl font-black text-[#1A2B56]">Create the first event gallery.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-gray-500">Add a year, cover image, and all of the event photos that should live on the public site.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-[800px] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-[#f8fafc]">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Gallery</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Year</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Photos</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {galleries.map((gallery) => {
            const coverImage = toSafeImageSrc(gallery.coverImage);
            const isDeleting = deletingId === gallery.id;

            return (
              <tr key={gallery.id} className="hover:bg-[#f8fafc]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {coverImage && <Image src={coverImage} alt="" fill sizes="80px" className="object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-1 font-bold text-[#1A2B56]">{gallery.title}</p>
                      <p className="mt-1 line-clamp-1 text-xs font-medium text-gray-500">/{gallery.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#1A2B56]">{gallery.year}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-600">{gallery.images.length}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${gallery.status === 'published' ? 'bg-[#74C044]/15 text-[#3f7e28]' : 'bg-amber-100 text-amber-700'}`}>
                    {gallery.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/galleries/${gallery.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-[#21409A] hover:text-white"
                      aria-label={`Edit ${gallery.title}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteGallery(gallery)}
                      disabled={isDeleting}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-45"
                      aria-label={`Delete ${gallery.title}`}
                    >
                      {isDeleting ? (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" /></svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" /></svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
