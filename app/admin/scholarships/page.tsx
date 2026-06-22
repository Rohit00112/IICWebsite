import React from 'react';
import Link from 'next/link';
import { getAllScholarshipBatches } from '@/lib/scholarships';
import ScholarshipBatchTable from '@/components/admin/ScholarshipBatchTable';

const AdminScholarshipsPage = async () => {
  const batches = await getAllScholarshipBatches();
  const years = new Set(batches.map((batch) => batch.year));

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-sora text-4xl font-black tracking-tight text-[#1A2B56]">Scholarships</h1>
          <p className="font-medium text-gray-500">Manage yearwise scholarship batches and public recipient archives.</p>
        </div>
        <Link
          href="/admin/scholarships/new"
          className="flex items-center gap-3 rounded-2xl bg-[#21409A] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#21409A]/20"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Create Batch
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-400">Total Batches</p>
          <p className="font-sora text-4xl font-black text-[#1A2B56]">{batches.length}</p>
        </div>
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-400">Published</p>
          <p className="font-sora text-4xl font-black text-[#4B8F30]">{batches.filter((batch) => batch.status === 'published').length}</p>
        </div>
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-400">Drafts</p>
          <p className="font-sora text-4xl font-black text-amber-500">{batches.filter((batch) => batch.status === 'draft').length}</p>
        </div>
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-400">Years</p>
          <p className="font-sora text-4xl font-black text-[#21409A]">{years.size}</p>
        </div>
      </div>

      <ScholarshipBatchTable initialBatches={batches} />
    </div>
  );
};

export default AdminScholarshipsPage;
