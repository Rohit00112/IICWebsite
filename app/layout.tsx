import React from "react";
import { Geist, Geist_Mono, Sora, Roboto } from "next/font/google";
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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const viewport: Viewport = {
  themeColor: "#21409A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Itahari International College | UK Degrees in Itahari, Nepal",
    template: "%s | Itahari International College",
  },
  description: "Itahari International College (IIC) develops impactful industry-ready graduates through UK-awarded IT and Business programmes in partnership with London Metropolitan University.",
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
    languages: {
      "en-NP": "https://iic.edu.np",
    },
  },
  openGraph: {
    title: "Itahari International College | UK Degrees in Itahari",
    description: "Study globally connected IT and Business degrees in Itahari through IIC's partnership with London Metropolitan University.",
    url: "https://iic.edu.np",
    siteName: "Itahari International College",
    images: [
      {
        url: "/api/og?title=Itahari International College&subtitle=Developing Industry-Ready Graduates&section=UK Degrees in Itahari",
        width: 1200,
        height: 630,
        alt: "Itahari International College",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itahari International College",
    description: "UK-awarded undergraduate programmes in IT and Business in Nepal.",
    site: "@iic_nepal",
    creator: "@iic_nepal",
    images: ["/api/og?title=Itahari International College&subtitle=Developing Industry-Ready Graduates&section=UK Degrees in Itahari"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${roboto.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-white">
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
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://iic.edu.np/images/common/iic_logo.png",
                    "width": "450",
                    "height": "80"
                  },
                  "image": "https://iic.edu.np/images/home/hero.webp",
                  "description": "Itahari International College (IIC) develops impactful industry-ready graduates through UK-awarded IT and Business degrees in partnership with London Metropolitan University.",
                  "foundingDate": "2017",
                  "knowsAbout": ["Information Technology", "Business Administration", "Higher Education", "UK Degrees"],
                  "sameAs": [
                    "https://www.facebook.com/iic.nepal",
                    "https://www.instagram.com/iic_nepal",
                    "https://www.linkedin.com/school/itahari-international-college/",
                    "https://www.youtube.com/@itahariinternationalcollege"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Sundarharaicha-4, Dulari",
                    "addressLocality": "Dulari",
                    "addressRegion": "Morang, Koshi Province",
                    "postalCode": "56705",
                    "addressCountry": "NP"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "26.6644",
                    "longitude": "87.2718"
                  },
                  "telephone": "+977-25-581111",
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+977-25-581111",
                      "contactType": "admissions",
                      "areaServed": "NP",
                      "availableLanguage": "Nepali, English"
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+977-25-581112",
                      "contactType": "customer service",
                      "areaServed": "NP",
                      "availableLanguage": "Nepali, English"
                    }
                  ],
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                      "opens": "07:00",
                      "closes": "17:00"
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://iic.edu.np/#website",
                  "url": "https://iic.edu.np",
                  "name": "Itahari International College",
                  "publisher": { "@id": "https://iic.edu.np/#college" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://iic.edu.np/search?q={search_term_string}",
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
