import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'UK Degree Programmes in Itahari | IT & Business | Itahari International College',
  description: 'Explore London Metropolitan University awarded IT and Business programmes at IIC, designed for practical learning and global career readiness.',
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
                "description": "A UK-awarded Information Technology degree in partnership with London Metropolitan University. Covers software engineering, web development, and data science.",
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
                "description": "An industry-focused business degree awarded by London Metropolitan University, UK. Specialising in modern management, finance, and entrepreneurship.",
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
