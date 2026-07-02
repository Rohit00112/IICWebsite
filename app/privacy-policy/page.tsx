import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/common/JsonLd';
import { buildBreadcrumbListNode, buildSchemaGraph, buildWebPageNode } from '@/lib/seo-schema';

const pageDescription = 'Learn how Itahari International College handles information submitted through its website forms.';

export const metadata: Metadata = {
  title: 'Privacy Policy | Itahari International College',
  description: pageDescription,
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Itahari International College',
    description: pageDescription,
    url: '/privacy-policy',
    type: 'website',
  },
};

const sections = [
  {
    title: 'Information We Collect',
    body: 'When you submit an enquiry, application, callback request, or prospectus form, we may collect your name, email address, phone number, programme interest, academic details, and message.',
  },
  {
    title: 'How We Use It',
    body: 'We use submitted information to respond to enquiries, support admissions, provide programme guidance, arrange college visits, and share relevant college updates.',
  },
  {
    title: 'Data Sharing',
    body: 'We do not sell personal information. We may share details with teams from Itahari International College or trusted service providers only when needed to support your enquiry or application.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions or data requests, contact us at info@iic.edu.np or visit the admissions office at Itahari International College.',
  },
];

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy-policy' },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7fa] pt-24 pb-16 md:pt-28 md:pb-20">
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/privacy-policy',
            name: 'Privacy Policy',
            description: pageDescription,
          }),
          buildBreadcrumbListNode(breadcrumbs),
        ])}
      />
      <section className="mx-auto max-w-4xl px-6">
        <Link href="/" className="text-sm font-bold text-[#21409A] hover:underline">
          Back to home
        </Link>
        <div className="mt-10">
          <p className="mb-4 text-xs font-bold tracking-[0.24em] text-[#74C044]">
            Website Policy
          </p>
          <h1 className="font-iic text-4xl font-black tracking-tight text-[#1a1a1a] md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600 md:text-lg">
            This policy explains how Itahari International College handles information submitted through this website.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-iic text-xl font-bold text-[#21409A]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600 md:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
