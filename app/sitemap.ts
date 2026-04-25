import { MetadataRoute } from 'next';
import { getAllCourses } from '@/lib/courses';
import { getAllNews } from '@/lib/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://iic.edu.np';

  // Define static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/courses',
    '/news',
    '/life-at-iic',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes
  try {
    const [courses, news] = await Promise.all([
      getAllCourses(),
      getAllNews(),
    ]);

    const courseEntries = courses.map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const newsEntries = news.map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticEntries, ...courseEntries, ...newsEntries];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return staticEntries;
  }
}

