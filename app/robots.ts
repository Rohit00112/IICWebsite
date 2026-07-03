import type { MetadataRoute } from 'next';

import { SITE_URL, absoluteUrl } from '@/lib/seo-schema';

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/admin/', '/login', '/api/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-User',
          'anthropic-ai',
          'Google-Extended',
          'Bingbot',
        ],
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
