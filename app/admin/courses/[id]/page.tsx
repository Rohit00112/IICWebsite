import React from 'react';

import { getCourseById } from '../../../../lib/courses';
import { notFound } from 'next/navigation';
import EditCourseForm from '../../../../components/admin/EditCourseForm';

export const dynamic = 'force-dynamic';


type EditCourse = React.ComponentProps<typeof EditCourseForm>['course'];

function toEditCourse(course: NonNullable<Awaited<ReturnType<typeof getCourseById>>>): EditCourse {
  return {
    ...course,
    subtitle: course.subtitle || '',
    level: course.level || '',
    overview: course.overview || '',
    details: {
      level: course.details?.level || '',
      duration: course.details?.duration || '',
      intake: course.details?.intake || '',
      awardingBody: course.details?.awardingBody || '',
    },
    curriculum: (course.curriculum || []).map((year) => ({
      title: year.title || '',
      modules: (year.modules || []).map((module) => ({
        name: module.name || '',
        code: module.code || '',
        description: module.description || '',
        credits: module.credits || '',
      })),
    })),
    careerOpportunities: (course.careerOpportunities || []).map((career) => ({
      title: career.title || '',
      description: career.description || '',
      color: career.color || '',
    })),
    faculty: (course.faculty || []).map((member) => ({
      name: member.name || '',
      role: member.role || '',
      description: member.description || '',
      image: member.image || '',
    })),
    projects: (course.projects || []).map((project) => ({
      title: project.title || '',
      cohort: project.cohort || '',
      image: project.image || '',
    })),
    faqs: (course.faqs || []).map((faq) => ({
      question: faq.question || '',
      answer: faq.answer || '',
    })),
  };
}

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

  return <EditCoursePageClient course={toEditCourse(course)} />;
}

// Separate client wrapper to ensure clean serialization if needed, 
// though EditCourseForm is already a client component.
function EditCoursePageClient({ course }: { course: EditCourse }) {
  return <EditCourseForm course={course} />;
}
