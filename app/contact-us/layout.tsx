import { Metadata } from 'next';

const pageDescription =
  'Contact IIC for admissions guidance, college visits, partnerships, and support for UK-awarded IT and Business programmes in Itahari.';

export const metadata: Metadata = {
  title: 'Contact Us | Admissions & Directions in Itahari',
  description: pageDescription,
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact Us | Itahari International College',
    description: pageDescription,
    url: '/contact-us',
    type: 'website',
    images: [
      {
        url: '/og/contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Admissions & Directions in Itahari',
    description: pageDescription,
    images: ['/og/contact.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
