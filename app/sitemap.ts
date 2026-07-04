import type { MetadataRoute } from 'next';

import { getAllCourses } from '@/lib/courses';
import { getPublishedEventGalleryArchives } from '@/lib/event-galleries';
import { getAllNews } from '@/lib/news';
import { absoluteUrl, toIsoDate } from '@/lib/seo-schema';

// Refresh the sitemap hourly so admin-added courses/news/galleries appear
// without needing a full rebuild.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const staticRoutes: Array<{
  path: string;
  changeFrequency: Entry['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/admissions', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/courses', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/scholarship', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/life-at-iic', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/news-and-events', changeFrequency: 'daily', priority: 0.7 },
  { path: '/contact-us', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [courses, news, galleries] = await Promise.all([
    getAllCourses().catch(() => []),
    getAllNews().catch(() => []),
    getPublishedEventGalleryArchives().catch(() => []),
  ]);

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/${course.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = news
    .filter((item) => item.slug)
    .map((item) => ({
      url: absoluteUrl(`/news-and-events/${item.slug}`),
      lastModified: toIsoDate(item.date) ?? now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const galleryEntries: MetadataRoute.Sitemap = galleries.map((gallery) => ({
    url: absoluteUrl(`/life-at-iic/events/${gallery.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...courseEntries, ...newsEntries, ...galleryEntries];
}
