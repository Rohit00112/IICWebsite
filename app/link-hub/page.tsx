import type { Metadata } from 'next';
import LinksPageContent from '@/components/sections/LinksPageContent';

// Brochure-only landing page. Intentionally kept out of the sitemap and navbar,
// and flagged noindex/nofollow so it never enters search results.
export const metadata: Metadata = {
  title: 'Itahari International College',
  description: 'Quick links to Itahari International College — website, socials, and programmes.',
  alternates: { canonical: '/link-hub' },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function LinksPage() {
  return <LinksPageContent />;
}
