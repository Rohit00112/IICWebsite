import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo-schema';

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/admin', '/admin/', '/login', '/api/'];
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
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: aiBots,
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
