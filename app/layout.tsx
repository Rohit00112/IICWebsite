import React from "react";
import { Geist, Geist_Mono, Sora, Roboto } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import JsonLd from "@/components/common/JsonLd";
import MarketingScripts from "@/components/common/MarketingScripts";
import { absoluteAssetUrl, buildGlobalSchema, SITE_URL } from "@/lib/seo-schema";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
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
  authors: [{ name: "Itahari International College" }],
  creator: "Itahari International College",
  publisher: "Itahari International College",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/favicon.png?v=2", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.png?v=2"],
    apple: [{ url: "/favicon.png?v=2", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Itahari International College | UK Degrees in Itahari",
    description: "Study globally connected IT and Business degrees in Itahari through IIC's partnership with London Metropolitan University.",
    url: "/",
    siteName: "Itahari International College",
    images: [
      {
        url: absoluteAssetUrl("/og/home.png"),
        width: 1200,
        height: 630,
        alt: "Itahari International College",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itahari International College",
    description: "UK-awarded undergraduate programmes in IT and Business in Nepal.",
    site: "@iic_nepal",
    creator: "@iic_nepal",
    images: [absoluteAssetUrl("/og/home.png")],
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
        <JsonLd data={buildGlobalSchema()} />
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <MarketingScripts />
      </body>

    </html>
  );
}
