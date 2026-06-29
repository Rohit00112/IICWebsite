import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Admissions & Directions in Itahari | Itahari International College',
  description: 'Contact IIC for admissions guidance, college visits, partnerships, and support for UK-awarded IT and Business programmes in Itahari.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
