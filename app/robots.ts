import type { MetadataRoute } from 'next';

import { SITE_URL, absoluteUrl } from '@/lib/seo-schema';

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/admin/', '/login', '/api/'];
  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'Claude-User',
    'anthropic-ai',
    'Google-Extended',
    'Bingbot',
    'CCBot',
    'Applebot-Extended',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: privatePaths,
      },
      {
        userAgent: aiBots,
        allow: ['/', '/api/og'],
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}