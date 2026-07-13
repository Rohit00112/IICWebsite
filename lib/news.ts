import prisma from './db';
import { toSafeImageSrc } from './image-source';

// Helper to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface NewsAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  category: 'News' | 'Event' | 'Blog';
  date: string;
  time?: string;
  location?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  slug: string;
  featured: boolean;
  author?: NewsAuthor;
}

import { revalidateTag } from 'next/cache';

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNewsItem(doc: any): NewsItem {
  const authorData = (doc.author as Record<string, string>) || {};

  return {
    id: doc.id,
    category: doc.category,
    date: doc.date,
    time: doc.time,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    image: toSafeImageSrc(doc.image, '/images/common/tower_block.JPG'),
    slug: doc.slug || doc.id,
    featured: doc.featured,
    author: {
      name: authorData.name || '',
      role: authorData.role || '',
      avatar: toSafeImageSrc(authorData.avatar),
    },
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return news.map(mapNewsItem);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    const item = await prisma.news.findUnique({ where: { id } });
    return item ? mapNewsItem(item) : null;
  } catch {
    return null;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    // Try by slug first
    let item = await prisma.news.findFirst({ where: { slug } });
    // Fall back to ID lookup for existing articles without slugs
    if (!item) {
      try {
        item = await prisma.news.findUnique({ where: { id: slug } });
      } catch {
        // Not a valid UUID, that's fine
      }
    }
    return item ? mapNewsItem(item) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedNews(): Promise<NewsItem | null> {
  const item = await prisma.news.findFirst({ where: { featured: true } });
  if (item) return mapNewsItem(item);

  // Fallback to latest news if no featured one found
  const latest = await prisma.news.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  return latest ? mapNewsItem(latest) : null;
}

import { sanitizeHtml } from './sanitize';

async function makeUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'article';
  let slug = root;
  let n = 2;
  // Append -2, -3, ... until the slug is free
  while (true) {
    const clash = await prisma.news.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!clash) return slug;
    slug = `${root}-${n++}`;
  }
}

export async function createNews(data: Partial<NewsItem>): Promise<NewsItem> {
  // Auto-generate a unique slug from title if not provided
  if (!data.slug && data.title) {
    data.slug = await makeUniqueSlug(generateSlug(data.title));
  }
  // Sanitize content
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }
  const newItem = await prisma.news.create({
    data: {
      category: data.category || 'News',
      date: data.date || '',
      time: data.time,
      location: data.location,
      title: data.title || '',
      slug: data.slug,
      description: data.description || '',
      content: data.content || '',
      image: data.image ?? '',
      featured: data.featured ?? false,
      author: data.author ? JSON.parse(JSON.stringify(data.author)) : undefined,
    },
  });
  safeRevalidateTag('news');
  return mapNewsItem(newItem);
}

export async function updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem | null> {
  // Regenerate a unique slug if title changed
  if (data.title && !data.slug) {
    data.slug = await makeUniqueSlug(generateSlug(data.title), id);
  }
  // Sanitize content
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePayload: Record<string, any> = {};
  if (data.category !== undefined) updatePayload.category = data.category;
  if (data.date !== undefined) updatePayload.date = data.date;
  if (data.time !== undefined) updatePayload.time = data.time;
  if (data.location !== undefined) updatePayload.location = data.location;
  if (data.title !== undefined) updatePayload.title = data.title;
  if (data.slug !== undefined) updatePayload.slug = data.slug;
  if (data.description !== undefined) updatePayload.description = data.description;
  if (data.content !== undefined) updatePayload.content = data.content;
  if (data.image !== undefined) updatePayload.image = data.image;
  if (data.featured !== undefined) updatePayload.featured = data.featured;
  if (data.author !== undefined) updatePayload.author = JSON.parse(JSON.stringify(data.author));

  try {
    const updatedItem = await prisma.news.update({
      where: { id },
      data: updatePayload,
    });
    safeRevalidateTag('news');
    return mapNewsItem(updatedItem);
  } catch {
    return null;
  }
}

export async function deleteNews(id: string): Promise<boolean> {
  try {
    await prisma.news.delete({ where: { id } });
    safeRevalidateTag('news');
    return true;
  } catch {
    return false;
  }
}

export async function filterNews(category: string, search: string): Promise<NewsItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  // Category mapping
  if (category !== 'All') {
    let normalizedCategory = category;
    if (category === 'Events') normalizedCategory = 'Event';
    if (category === 'Blogs') normalizedCategory = 'Blog';
    where.category = normalizedCategory;
  }

  // Search logic
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const news = await prisma.news.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return news.map(mapNewsItem);
}

export interface UpcomingEvent {
  id: string;
  slug: string;
  title: string;
  time?: string;
  day: string;
  month: string;
  year: string;
  date: string;
}

type UpcomingEventRecord = {
  id: string;
  slug: string | null;
  title: string;
  time: string | null;
  date: string;
};

export async function getUpcomingEvents(limit = 4): Promise<UpcomingEvent[]> {
  const now = new Date();
  const events: UpcomingEventRecord[] = await prisma.news.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      time: true,
      date: true,
    },
    where: { category: 'Event' },
  });
  const monthShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return events
    .map((doc) => {
      const d = new Date(doc.date);
      return {
        raw: d,
        item: {
          id: doc.id,
          slug: doc.slug || doc.id,
          title: doc.title,
          time: doc.time ?? undefined,
          date: doc.date,
          day: String(d.getDate()).padStart(2, '0'),
          month: monthShort[d.getMonth()] || '',
          year: String(d.getFullYear()),
        } as UpcomingEvent,
      };
    })
    .filter(({ raw }) => !isNaN(raw.getTime()) && raw.getTime() >= now.getTime() - 24 * 60 * 60 * 1000)
    .sort((a, b) => a.raw.getTime() - b.raw.getTime())
    .slice(0, limit)
    .map(({ item }) => item);
}

export interface ArchiveEntry {
  month: string;
  year: number;
  monthIndex: number;
  count: number;
}

export async function getNewsArchive(limit = 6): Promise<ArchiveEntry[]> {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const news = await prisma.news.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  // Group by year/month in JS (replaces MongoDB aggregate)
  const buckets = new Map<string, { y: number; m: number; count: number }>();

  for (const item of news) {
    const d = item.createdAt;
    const y = d.getFullYear();
    const m = d.getMonth() + 1; // 1-indexed
    const key = `${y}-${m}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.count++;
    } else {
      buckets.set(key, { y, m, count: 1 });
    }
  }

  return [...buckets.values()]
    .sort((a, b) => b.y - a.y || b.m - a.m)
    .slice(0, limit)
    .map((d) => ({
      monthIndex: d.m - 1,
      year: d.y,
      month: `${monthNames[d.m - 1]} ${d.y}`,
      count: d.count,
    }));
}

export async function getRelatedNews(category: string, currentId: string, limit = 3): Promise<NewsItem[]> {
  const news = await prisma.news.findMany({
    where: {
      category,
      NOT: { id: currentId },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return news.map(mapNewsItem);
}
