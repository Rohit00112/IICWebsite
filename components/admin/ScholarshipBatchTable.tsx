'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ScholarshipBatch } from '@/lib/scholarships';

const awardLabels = {
  aaa: 'AAA Scholarship',
  ing_postgraduate: 'ING Postgraduate',
};

export default function ScholarshipBatchTable({ initialBatches }: { initialBatches: ScholarshipBatch[] }) {
  const [batches, setBatches] = useState(initialBatches);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this scholarship batch? This action cannot be undone.')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/scholarships/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBatches(batches.filter((batch) => batch.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete scholarship batch.');
      }
    } catch (error) {
      console.error('Error deleting scholarship batch:', error);
      alert('An error occurred while deleting.');
    } finally {
      setDeleting(null);
    }
  };

  if (batches.length === 0) {
    return (
      <div className="rounded-[32px] border border-gray-100 bg-white p-12 text-center shadow-sm">
        <p className="text-xs font-black tracking-[0.2em] text-[#21409A]">No Batches Yet</p>
        <h2 className="mt-4 text-3xl font-black text-[#1A2B56]">Create the first scholarship year.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-gray-500">
          Add a yearwise batch, upload group photos, and publish recipients when the list is ready for the public site.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            <th className="px-8 py-6 text-xs font-bold tracking-widest text-gray-400">Batch</th>
            <th className="px-8 py-6 text-xs font-bold tracking-widest text-gray-400">Award</th>
            <th className="px-8 py-6 text-xs font-bold tracking-widest text-gray-400">Recipients</th>
            <th className="px-8 py-6 text-xs font-bold tracking-widest text-gray-400">Status</th>
            <th className="px-8 py-6 text-right text-xs font-bold tracking-widest text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {batches.map((batch) => (
            <tr key={batch.id} className="group hover:bg-gray-50/50">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                    {batch.groupImage ? (
                      <Image src={batch.groupImage} alt={batch.title} fill sizes="80px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-black text-gray-300">
                        {batch.year}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-bold text-[#1A2B56]">{batch.title}</p>
                    <p className="text-xs font-medium text-gray-400">Year {batch.year}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${
                  batch.awardType === 'aaa' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>
                  {awardLabels[batch.awardType]}
                </span>
              </td>
              <td className="px-8 py-6">
                <span className="text-sm font-bold text-gray-500">{batch.recipients.length}</span>
              </td>
              <td className="px-8 py-6">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black tracking-wider ${
                  batch.status === 'published' ? 'bg-[#74C044]/10 text-[#4B8F30]' : 'bg-amber-50 text-amber-600'
                }`}>
                  <span className={`h-2 w-2 rounded-full ${batch.status === 'published' ? 'bg-[#74C044]' : 'bg-amber-400'}`} />
                  {batch.status}
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/scholarships/${batch.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-[#21409A] hover:text-white"
                    aria-label={`Edit ${batch.title}`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(batch.id)}
                    disabled={deleting === batch.id}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                    aria-label={`Delete ${batch.title}`}
                  >
                    {deleting === batch.id ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
