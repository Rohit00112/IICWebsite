import CourseTemplate from '@/components/sections/course-detail/CourseTemplate';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getAllCourses } from '@/lib/courses';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import {
  buildCourseNode,
  buildFaqPageNode,
  buildSchemaGraph,
  buildWebPageNode,
  COURSES_PAGE_KEYWORDS,
  mergeKeywords,
} from '@/lib/seo-schema';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) return { title: 'Course Not Found' };
  const keywords = mergeKeywords(COURSES_PAGE_KEYWORDS, [
    course.title,
    course.subtitle,
    course.category,
    course.listing?.displayTitle,
    course.listing?.specialism,
  ]);

  return {
    title: `${course.title} | London Metropolitan University | Itahari International College`,
    description: `${course.description} Study ${course.title} in Itahari, Nepal. Direct UK degree in partnership with London Metropolitan University.`,
    keywords,
    alternates: { canonical: `/courses/${slug}` },
    openGraph: {
      title: `${course.title} - London Metropolitan University UK Degree`,
      description: course.description,
      url: `/courses/${slug}`,
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
  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug),
    getAllCourses()
  ]);

  if (!course) {
    notFound();
  }

  const relatedCourses = allCourses
    .filter(c => c.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Courses', item: '/courses' },
    { name: course.title, item: `/courses/${course.slug}` },
  ];
  const courseSchema = buildCourseNode(course);
  const faqSchema = buildFaqPageNode(
    course.faqs || [],
    `https://iic.edu.np/courses/${course.slug}#faq`
  );
  const pageDescription = `${course.description} Study ${course.title} in Itahari, Nepal. Direct UK degree in partnership with London Metropolitan University.`;
  const pageKeywords = mergeKeywords(COURSES_PAGE_KEYWORDS, [
    course.title,
    course.subtitle,
    course.category,
    course.listing?.displayTitle,
    course.listing?.specialism,
  ]);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: `/courses/${course.slug}`,
            name: course.title,
            description: pageDescription,
            image: course.image,
            keywords: pageKeywords,
            mainEntity: { '@id': courseSchema['@id'] },
          }),
          courseSchema,
          faqSchema,
        ])}
      />
      <CourseTemplate course={course} relatedCourses={relatedCourses} />
    </>
  );
}
