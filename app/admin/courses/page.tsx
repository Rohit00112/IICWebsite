import React from 'react';

import Link from 'next/link';
import { getAllCourses } from '../../../lib/courses';
import CourseTable from '../../../components/admin/CourseTable';

export const dynamic = 'force-dynamic';


const AdminCoursesPage = async () => {
  const courses = await getAllCourses();

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#1A2B56] font-sora tracking-tight mb-2">Academic Courses</h1>
          <p className="text-gray-500 font-medium">Manage your academic programmes and curriculum.</p>
        </div>
        <Link 
          href="/admin/courses/new"
          className="px-8 py-4 bg-[#74C044] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#74C044]/20 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add New Course
        </Link>
      </div>

      {/* Course Listing Table */}
      <CourseTable initialCourses={JSON.parse(JSON.stringify(courses))} />
    </div>
  );
};

export default AdminCoursesPage;
