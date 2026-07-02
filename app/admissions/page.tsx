import { Metadata } from 'next';
import AdmissionsClient from '@/components/sections/admissions/AdmissionsClient';
import JsonLd from '@/components/common/JsonLd';
import {
  buildAdmissionProgramNodes,
  buildBreadcrumbListNode,
  buildFaqPageNode,
  buildSchemaGraph,
  buildWebPageNode,
} from '@/lib/seo-schema';

const pageDescription = 'Apply to Itahari International College for UK-awarded IT and Business programmes delivered in partnership with London Metropolitan University.';

export const metadata: Metadata = {
  title: 'Apply Now | Admissions 2026',
  description: pageDescription,
  keywords: ['Apply to Itahari International College', 'College Admission Nepal', 'IT Admission Itahari', 'BA Admission Nepal', 'Online Application Itahari International College'],
  alternates: { canonical: '/admissions' },
  openGraph: {
    title: 'Apply Now | Admissions - Itahari International College',
    description: 'Start your application for globally connected UK degrees in IT and Business at Itahari International College.',
    url: '/admissions',
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
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Admissions', item: '/admissions' },
  ];
  const faqSchema = buildFaqPageNode(
    [
      {
        question: 'What are the entry requirements for Itahari International College?',
        answer: 'The minimum entry requirement for our undergraduate programmes is a 2.0 CGPA in +2/NEB or equivalent, along with proficiency in English.',
      },
      {
        question: 'Which degree programmes does Itahari International College offer?',
        answer: 'Itahari International College offers BSc (Hons) Computing and BA (Hons) Business Administration in partnership with London Metropolitan University, UK.',
      },
      {
        question: 'Are the degrees offered at Itahari International College internationally recognised?',
        answer: 'Yes, our programmes are awarded by London Metropolitan University, UK, and are recognised by the Ministry of Education, Nepal and internationally.',
      },
    ],
    'https://iic.edu.np/admissions#faq'
  );

  return (
    <main className="min-h-screen bg-[#F4F7FA]">
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/admissions',
            name: 'Admissions at Itahari International College',
            description: pageDescription,
            image: '/images/admission/riju.png',
          }),
          buildBreadcrumbListNode(breadcrumbs),
          ...buildAdmissionProgramNodes(),
          faqSchema,
        ])}
      />
      <AdmissionsClient />
    </main>
  );
}
