import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import { getAllCourses } from '@/lib/courses';
import JsonLd from '@/components/common/JsonLd';
import {
  buildCourseItemListNode,
  buildCourseNode,
  buildSchemaGraph,
  buildWebPageNode,
  COURSES_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription = 'Explore London Metropolitan University awarded IT and Business programmes at IIC, designed for practical learning and global career readiness.';

export const metadata: Metadata = {
  title: 'UK Degree Programmes in Itahari | IT & Business',
  description: pageDescription,
  alternates: { canonical: '/courses' },
  openGraph: {
    title: 'UK Degree Programmes in Itahari | IT & Business',
    description: pageDescription,
    url: '/courses',
    type: 'website',
    images: [
      {
        url: '/og/courses.png',
        width: 1200,
        height: 630,
        alt: 'UK degree programmes at Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Degree Programmes in Itahari | IT & Business',
    description: pageDescription,
    images: ['/og/courses.png'],
  },
};

export default async function CoursesPage() {
  let courses: Awaited<ReturnType<typeof getAllCourses>> = [];

  try {
    courses = await getAllCourses();
  } catch (err) {
    console.error('[courses] DB unavailable, rendering default course cards:', err);
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Academic Programmes', item: '/courses' },
  ];

  return (
    <main className="bg-[#f3f6fb]">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/courses',
            name: 'UK Degree Programmes at Itahari International College',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/courses/course-hero.JPG',
            keywords: COURSES_PAGE_KEYWORDS,
          }),
          buildCourseItemListNode(courses),
          ...courses.map(buildCourseNode),
        ])}
      />

      <CoursesHero />
      <CoursesList courses={courses} />
    </main>
  );
}
