import { Metadata } from 'next';
import AdmissionsClient from '@/components/sections/admissions/AdmissionsClient';

export const metadata: Metadata = {
  title: 'Apply Now | Admissions 2026',
  description: 'Join Itahari International College. Apply online for our BIT and BBA programs in partnership with London Metropolitan University, UK. Start your global journey today.',
  keywords: ['Apply to IIC', 'College Admission Nepal', 'IT Admission Itahari', 'BBA Admission Nepal', 'Online Application IIC'],
  openGraph: {
    title: 'Apply Now | Admissions - Itahari International College',
    description: 'Start your application for world-class UK degrees in IT and Business at IIC.',
    images: [
      {
        url: '/api/og?title=Admissions 2026&subtitle=Start Your Global Journey&section=Apply Now',
        width: 1200,
        height: 630,
        alt: 'IIC Admissions',
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
              }
            ]
          })
        }}
      />
      <AdmissionsClient />
    </main>
  );
}
