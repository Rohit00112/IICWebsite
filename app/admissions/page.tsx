import { Metadata } from 'next';
import AdmissionsClient from '@/components/sections/admissions/AdmissionsClient';

export const metadata: Metadata = {
  title: 'Apply Now | Admissions 2026',
  description: 'Apply to Itahari International College for UK-awarded IT and Business programmes delivered in partnership with London Metropolitan University.',
  keywords: ['Apply to Itahari International College', 'College Admission Nepal', 'IT Admission Itahari', 'BBA Admission Nepal', 'Online Application Itahari International College'],
  openGraph: {
    title: 'Apply Now | Admissions - Itahari International College',
    description: 'Start your application for globally connected UK degrees in IT and Business at Itahari International College.',
    images: [
      {
        url: '/api/og?title=Admissions 2026&subtitle=Start Your Global Journey&section=Apply Now',
        width: 1200,
        height: 630,
        alt: 'Itahari International College Admissions',
      },
    ],
  },
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA]">
      {/* Educational Program Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://iic.edu.np"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Admissions",
                    "item": "https://iic.edu.np/admissions"
                  }
                ]
              },
              {
                "@type": "EducationalOccupationalProgram",
                "name": "BSc (Hons) Computing",
                "description": "A 3-year undergraduate degree in Information Technology awarded through IIC's partnership with London Metropolitan University.",
                "provider": {
                  "@id": "https://iic.edu.np/#college"
                },
                "programPrerequisites": "Minimum 2.0 CGPA in +2/NEB or equivalent",
                "offers": {
                  "@type": "Offer",
                  "category": "Admission"
                }
              },
              {
                "@type": "EducationalOccupationalProgram",
                "name": "BBA (Hons) Business Administration",
                "description": "A 3-year business degree focused on international standards, modern management, and entrepreneurship.",
                "provider": {
                  "@id": "https://iic.edu.np/#college"
                },
                "programPrerequisites": "Minimum 2.0 CGPA in +2/NEB or equivalent",
                "offers": {
                  "@type": "Offer",
                  "category": "Admission"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are the entry requirements for Itahari International College?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The minimum entry requirement for our undergraduate programmes is a 2.0 CGPA in +2/NEB or equivalent, along with proficiency in English."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which degree programmes does Itahari International College offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Itahari International College offers BSc (Hons) Computing and BBA (Hons) Business Administration in partnership with London Metropolitan University, UK."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are the degrees offered at Itahari International College internationally recognised?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our programmes are awarded by London Metropolitan University, UK, and are recognised by the Ministry of Education, Nepal and internationally."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <AdmissionsClient />
    </main>
  );
}
