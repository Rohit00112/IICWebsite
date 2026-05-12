import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'UK Degree Programmes in Itahari | BIT & BBA Catalog | Itahari International College',
  description: 'Explore our world-class undergraduate programs in Information Technology and Business Administration. Direct UK degrees from London Metropolitan University.',
};

export default function CoursesPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Academic Programmes', item: '/courses' },
  ];

  return (
    <main className="bg-[#f3f6fb]">
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Course & Program Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Course",
                "name": "BSc (Hons) Computing",
                "description": "A world-class UK degree in Information Technology in partnership with London Metropolitan University. Covers software engineering, web development, and data science.",
                "provider": {
                  "@type": "CollegeOrUniversity",
                  "name": "Itahari International College",
                  "url": "https://iic.edu.np"
                },
                "educationalLevel": "Undergraduate",
                "courseCode": "BSC-COMPUTING",
                "occupationalCategory": "Information Technology",
                "hasCourseInstance": {
                  "@type": "CourseInstance",
                  "courseMode": "Full-time",
                  "location": "Itahari, Nepal"
                }
              },
              {
                "@type": "Course",
                "name": "BBA (Hons) Business Administration",
                "description": "An industry-focused business degree awarded by London Metropolitan University, UK. Specializing in modern management, finance, and entrepreneurship.",
                "provider": {
                  "@type": "CollegeOrUniversity",
                  "name": "Itahari International College",
                  "url": "https://iic.edu.np"
                },
                "educationalLevel": "Undergraduate",
                "courseCode": "BBA-HONS",
                "occupationalCategory": "Business & Management",
                "hasCourseInstance": {
                  "@type": "CourseInstance",
                  "courseMode": "Full-time",
                  "location": "Itahari, Nepal"
                }
              }
            ]
          })
        }}
      />

      <CoursesHero />
      <CoursesList />
    </main>
  );
}
