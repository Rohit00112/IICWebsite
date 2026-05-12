import { Metadata } from 'next';
import AdmissionsClient from '@/components/sections/admissions/AdmissionsClient';

export const metadata: Metadata = {
  title: 'Apply Now | Admissions 2026',
  description: 'Join Itahari International College. Apply online for our BIT and BBA programs in partnership with London Metropolitan University, UK. Start your global journey today.',
  keywords: ['Apply to Itahari International College', 'College Admission Nepal', 'IT Admission Itahari', 'BBA Admission Nepal', 'Online Application Itahari International College'],
  openGraph: {
    title: 'Apply Now | Admissions - Itahari International College',
    description: 'Start your application for world-class UK degrees in IT and Business at Itahari International College.',
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
                "description": "A 3-year undergraduate degree in Information Technology in partnership with London Metropolitan University.",
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
                "description": "A comprehensive 3-year business degree focusing on modern management and entrepreneurship.",
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
                      "text": "The minimum entry requirement for our undergraduate programs is a 2.0 CGPA in +2/NEB or equivalent, along with proficiency in English."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which degree programs does Itahari International College offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Itahari International College offers BSc (Hons) Computing and BBA (Hons) Business Administration in partnership with London Metropolitan University, UK."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are the degrees offered at Itahari International College internationally recognized?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our programs are awarded by London Metropolitan University, UK, and are fully recognized by the Ministry of Education, Nepal and globally."
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
