import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iic.edu.np';

  // Define your static routes
  const routes = [
    '',
    '/about-us',
    '/contact',
    '/courses',
    '/news',
    '/life-at-iic',
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real application, you might want to fetch dynamic routes (e.g., courses, news)
  // and add them to the sitemap as well.
  
  return sitemapEntries;
}
