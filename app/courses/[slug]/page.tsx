import CourseTemplate from '@/components/sections/course-detail/CourseTemplate';
import { notFound } from 'next/navigation';
import courses from '@/data/courses.json';

const courseData: Record<string, any> = courses;

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseData[slug];

  if (!course) {
    notFound();
  }

  return <CourseTemplate course={course} />;
}
