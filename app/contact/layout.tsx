import { Metadata } from 'next';
import { CONTACT_PAGE_KEYWORDS } from '@/lib/seo-schema';

const pageDescription =
  'Contact IIC for admissions guidance, college visits, partnerships, and support for UK-awarded IT and Business programmes in Itahari.';

export const metadata: Metadata = {
  title: 'Contact Us | Admissions & Directions in Itahari | Itahari International College',
  description: pageDescription,
  keywords: CONTACT_PAGE_KEYWORDS,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Itahari International College',
    description: pageDescription,
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
