import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/common/JsonLd';
import { buildBreadcrumbListNode, buildSchemaGraph, buildWebPageNode, POLICY_PAGE_KEYWORDS } from '@/lib/seo-schema';

const pageDescription = 'Review the website terms for using the Itahari International College website.';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: pageDescription,
  keywords: POLICY_PAGE_KEYWORDS,
  alternates: { canonical: '/terms-of-service' },
  openGraph: {
    title: 'Terms of Service | Itahari International College',
    description: pageDescription,
    url: '/terms-of-service',
    type: 'website',
  },
};

const sections = [
  {
    title: 'Website Use',
    body: 'Use this website for lawful information, admissions, enquiry, and college communication purposes. Do not misuse forms, attempt unauthorised access, or disrupt website services.',
  },
  {
    title: 'Programme Information',
    body: 'Programme details, entry requirements, fees, scholarships, and dates may change. Contact the admissions team for the latest confirmed information before making decisions.',
  },
  {
    title: 'External Links',
    body: 'This website may link to partner, social, map, PDF, and Innovation Lab websites. Those sites are managed under their own terms and policies.',
  },
  {
    title: 'Contact',
    body: 'For questions about these website terms, reach the college through the contact page.',
  },
];

export default function TermsOfServicePage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Terms of Service', item: '/terms-of-service' },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7fa] pt-24 pb-16 md:pt-28 md:pb-20">
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/terms-of-service',
            name: 'Terms of Service',
            description: pageDescription,
            keywords: POLICY_PAGE_KEYWORDS,
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
            Website Terms
          </p>
          <h1 className="font-iic text-4xl font-black tracking-tight text-[#1a1a1a] md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600 md:text-lg">
            These terms outline acceptable use of the Itahari International College website.
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
