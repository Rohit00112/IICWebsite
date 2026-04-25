import CourseTemplate from '@/components/sections/course-detail/CourseTemplate';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/courses';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} | Itahari International College`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.image],
    },
  };
}

export default async function CoursePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Structured Data for Course
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: 'Itahari International College',
      sameAs: 'https://iic.edu.np',
    },
    image: course.image,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseTemplate course={course} />
    </>
  );
}
