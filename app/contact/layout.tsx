import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Admissions & Directions in Itahari | Itahari International College',
  description: 'Get in touch with Itahari International College. Find our location in Itahari, contact admissions for UK degree programs, or send us a message.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
