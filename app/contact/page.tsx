'use client';

import React from 'react';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactMap from '@/components/sections/contact/ContactMap';
import Footer from '@/components/layout/Footer';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbs} />
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
