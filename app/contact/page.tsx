'use client';

import React from 'react';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactMap from '@/components/sections/contact/ContactMap';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Itahari International College',
    description: 'Get in touch with Itahari International College for admissions, support, and general inquiries.',
    mainEntity: {
      '@type': 'CollegeOrUniversity',
      name: 'Itahari International College',
      telephone: '+977-9801003030',
      email: 'info@iic.edu.np',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sundarharaicha-4, Dulari',
        addressLocality: 'Dulari',
        addressRegion: 'Morang, Koshi Province',
        postalCode: '56705',
        addressCountry: 'NP'
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
