import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import { getAllCourses } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'UK Degree Programmes in Itahari | IT & Business | Itahari International College',
  description: 'Explore London Metropolitan University awarded IT and Business programmes at IIC, designed for practical learning and global career readiness.',
};

export default async function CoursesPage() {
  const courses = await getAllCourses();
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Academic Programmes', item: '/courses' },
  ];
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@graph": courses.map((course) => ({
      "@type": "Course",
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "CollegeOrUniversity",
        "name": "Itahari International College",
        "url": "https://iic.edu.np"
      },
      "educationalLevel": course.details?.level || course.level || "Undergraduate",
      "courseCode": course.slug.toUpperCase(),
      "occupationalCategory": course.category,
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Full-time",
        "location": "Itahari, Nepal"
      }
    }))
  };

  return (
    <main className="bg-[#f3f6fb]">
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Course & Program Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <CoursesHero />
      <CoursesList courses={courses} />
    </main>
  );
}
