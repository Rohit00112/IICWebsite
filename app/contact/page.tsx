'use client';

import React from 'react';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactMap from '@/components/sections/contact/ContactMap';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import { buildWebPageNode, COLLEGE_ID, CONTACT_PAGE_KEYWORDS, withContext } from '@/lib/seo-schema';

const pageDescription = 'Get in touch with Itahari International College for admissions, support, and general inquiries.';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={withContext(buildWebPageNode({
          path: '/contact',
          name: 'Contact Itahari International College',
          description: pageDescription,
          type: 'ContactPage',
          keywords: CONTACT_PAGE_KEYWORDS,
          mainEntity: { '@id': COLLEGE_ID },
        }))}
      />
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
