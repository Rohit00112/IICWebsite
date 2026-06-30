import CourseTemplate from '@/components/sections/course-detail/CourseTemplate';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getAllCourses } from '@/lib/courses';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} | London Metropolitan University | Itahari International College`,
    description: `${course.description} Study ${course.title} in Itahari, Nepal. Direct UK degree in partnership with London Metropolitan University.`,
    openGraph: {
      title: `${course.title} - London Metropolitan University UK Degree`,
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

  // Structured Data for Course
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: 'Itahari International College',
      url: 'https://iic.edu.np',
      logo: 'https://iic.edu.np/images/common/iic_logo.png',
    },
    educationalLevel: course.details?.level || 'Undergraduate',
    about: {
      '@type': 'Thing',
      name: course.category,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Full-time',
      duration: course.duration === '3 Years' ? 'P3Y' : 'P1Y',
      courseWorkload: 'Full-time',
      location: {
        '@type': 'Place',
        name: 'Itahari International College',
        address: {
          '@type': 'PostalAddress',
          'addressLocality': 'Itahari',
          'addressRegion': 'Sunsari',
          'addressCountry': 'NP'
        }
      }
    },
    educationalCredentialAwarded: course.details?.awardingBody ? `Degree from ${course.details.awardingBody}` : 'Undergraduate Degree',
    image: course.image,
    syllabusSections: course.curriculum?.map(year => ({
      '@type': 'Syllabus',
      name: year.title,
      description: year.modules?.map(m => m.name).join(', ')
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124'
    },
    review: course.quote?.text ? [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: course.quote.author || 'Alumni'
        },
        reviewBody: course.quote.text
      }
    ] : []
  };

  // Structured Data for FAQ if available
  const faqJsonLd = course.faqs && course.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;


  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Courses', item: '/courses' },
    { name: course.title, item: `/courses/${course.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <CourseTemplate course={course} relatedCourses={relatedCourses} />
    </>
  );
}
