import React from "react";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#21409A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Itahari International College | World-Class Education in Nepal",
    template: "%s | Itahari International College",
  },
  description: "Itahari International College (IIC) offers world-class undergraduate programs in Information Technology and Business in partnership with London Metropolitan University, UK.",
  keywords: ["IIC", "Itahari International College", "Education in Nepal", "IT College Nepal", "BBA Nepal", "BIT Nepal", "London Metropolitan University"],
  authors: [{ name: "Itahari International College" }],
  creator: "Itahari International College",
  publisher: "Itahari International College",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://iic.edu.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Itahari International College | World-Class Education in Nepal",
    description: "Empowering students with world-class education and global partnerships. Join IIC for industry-focused programs.",
    url: "https://iic.edu.np",
    siteName: "Itahari International College",
    images: [
      {
        url: "/images/common/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Itahari International College Campus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itahari International College",
    description: "World-class undergraduate programs in IT and Business in Nepal.",
    images: ["/images/common/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "CollegeOrUniversity",
                  "@id": "https://iic.edu.np/#college",
                  "name": "Itahari International College",
                  "url": "https://iic.edu.np",
                  "logo": "https://iic.edu.np/images/common/iic_logo.png",
                  "sameAs": [
                    "https://www.facebook.com/iic.nepal",
                    "https://www.instagram.com/iic_nepal",
                    "https://www.linkedin.com/school/itahari-international-college/"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Itahari",
                    "addressLocality": "Itahari",
                    "addressRegion": "Sunsari",
                    "postalCode": "56700",
                    "addressCountry": "NP"
                  },
                  "telephone": "+977-25-581111"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://iic.edu.np/#website",
                  "url": "https://iic.edu.np",
                  "name": "Itahari International College",
                  "publisher": { "@id": "https://iic.edu.np/#college" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://iic.edu.np/courses?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>

    </html>
  );
}


