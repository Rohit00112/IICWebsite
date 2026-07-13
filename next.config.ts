import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    root: process.cwd(),
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        statusCode: 301,
      },
      {
        source: '/news',
        destination: '/news-and-events',
        statusCode: 301,
      },
      {
        source: '/news/:slug',
        destination: '/news-and-events/:slug',
        statusCode: 301,
      },
      {
        source: '/scholarships',
        destination: '/scholarship',
        statusCode: 301,
      },
      {
        source: '/courses/:slug',
        destination: '/:slug',
        statusCode: 301,
      },
      {
        source: '/our-alumni',
        destination: '/alumni',
        statusCode: 301,
      },
      {
        source: '/bachelors-in-information-technology',
        destination: '/bsc-hons-computing',
        statusCode: 301,
      },
      {
        source: '/teaching-methodology',
        destination: '/about-us',
        statusCode: 301,
      },
      {
        source: '/life-at-iic/:slug',
        destination: '/life-at-iic/events/:slug',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
