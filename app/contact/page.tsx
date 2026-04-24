'use client';

import React from 'react';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactMap from '@/components/sections/contact/ContactMap';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
