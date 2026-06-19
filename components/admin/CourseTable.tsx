'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toSafeImageSrc } from '@/lib/image-source';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  image: string;
}

export default function CourseTable({ initialCourses }: { initialCourses: CourseItem[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    
    setDeleting(id);
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCourses(courses.filter(item => item.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete the course.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred while deleting.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-8 py-6 text-xs font-bold text-gray-400 tracking-widest">Course</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 tracking-widest">Category</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 tracking-widest">Level</th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {courses.map((item) => {
            const imageSrc = toSafeImageSrc(item.image);

            return (
            <tr key={item.id} className="hover:bg-gray-50/50 group">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                    {imageSrc && <Image src={imageSrc} alt={item.title} fill sizes="80px" className="object-cover" />}
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2B56] line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 font-medium">{item.duration}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="px-3 py-1 bg-gray-50 text-[#21409A] rounded-full text-[10px] font-bold tracking-wider border border-gray-100">
                  {item.category}
                </span>
              </td>
              <td className="px-8 py-6">
                <span className="text-sm text-gray-500 font-medium">{item.level}</span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link 
                    href={`/admin/courses/${item.id}`}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#21409A] hover:text-white shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                  >
                    {deleting === item.id ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
