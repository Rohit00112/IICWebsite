import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import CourseTemplate from '@/components/sections/course-detail/CourseTemplate';
import { getAllCourses, getCourseBySlug } from '@/lib/courses';
import {
  absoluteUrl,
  buildCourseNode,
  buildFaqPageNode,
  buildSchemaGraph,
  buildWebPageNode,
  COURSES_PAGE_KEYWORDS,
  mergeKeywords,
} from '@/lib/seo-schema';

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Page Not Found',
      description: "The page you're looking for doesn't exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${course.title} | London Metropolitan University`,
    description: `${course.description} Study ${course.title} in Itahari, Nepal. Direct UK degree in partnership with London Metropolitan University.`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${course.title} - London Metropolitan University UK Degree`,
      description: course.description,
      url: `/${slug}`,
      images: [course.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | London Metropolitan University`,
      description: `${course.description} Study ${course.title} in Itahari, Nepal. Direct UK degree in partnership with London Metropolitan University.`,
      images: [course.image],
    },
  };
}

export default async function CoursePage({
  params,
}: CoursePageProps) {
  const { slug } = await params;
  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug),
    getAllCourses(),
  ]);

  if (!course) {
    notFound();
  }

  const relatedCourses = allCourses
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Courses', item: '/courses' },
    { name: course.title, item: `/${course.slug}` },
  ];
  const courseSchema = buildCourseNode(course);
  const faqSchema = buildFaqPageNode(
    course.faqs || [],
    `${absoluteUrl(`/${course.slug}`)}#faq`
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
            path: `/${course.slug}`,
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
