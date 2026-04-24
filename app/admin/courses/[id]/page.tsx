import React from 'react';
import { getCourseById } from '../../../../lib/courses';
import { notFound } from 'next/navigation';
import EditCourseForm from '../../../../components/admin/EditCourseForm';

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <EditCoursePageClient course={course} />;
}

// Separate client wrapper to ensure clean serialization if needed, 
// though EditCourseForm is already a client component.
function EditCoursePageClient({ course }: { course: any }) {
  return <EditCourseForm course={course} />;
}
