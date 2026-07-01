import dbConnect from './db';
import News from '../models/News';
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
  category: 'News' | 'Event';
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

interface NewsDocument {
  _id: { toString(): string } | string;
  category: NewsItem['category'];
  date: string;
  time?: string;
  location?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  featured: boolean;
  author?: Partial<NewsAuthor>;
}

type NewsQuery = {
  category?: string;
  $or?: Array<{
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }>;
};

interface ArchiveDocument {
  _id: {
    y: number;
    m: number;
  };
  count: number;
}

import { revalidateTag } from 'next/cache';

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
}

// Helper to convert Mongo document to clean plain object
function mapNewsItem(doc: NewsDocument): NewsItem {
  const id = doc._id.toString();

  return {
    id,
    category: doc.category,
    date: doc.date,
    time: doc.time,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    image: toSafeImageSrc(doc.image, '/images/common/tower_block.JPG'),
    slug: doc.slug || id,
    featured: doc.featured,
    author: {
      name: doc.author?.name || '',
      role: doc.author?.role || '',
      avatar: toSafeImageSrc(doc.author?.avatar)
    },
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  await dbConnect();
  const news = await News.find({}).sort({ createdAt: -1 });
  return news.map(mapNewsItem);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  await dbConnect();
  try {
    const item = await News.findById(id);
    return item ? mapNewsItem(item) : null;
  } catch {
    return null;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  await dbConnect();
  try {
    // Try by slug first
    let item = await News.findOne({ slug });
    // Fall back to ID lookup for existing articles without slugs
    if (!item) {
      try {
        item = await News.findById(slug);
      } catch {
        // Not a valid ObjectId, that's fine
      }
    }
    return item ? mapNewsItem(item) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedNews(): Promise<NewsItem | null> {
  await dbConnect();
  const item = await News.findOne({ featured: true });
  if (item) return mapNewsItem(item);
  
  // Fallback to latest news if no featured one found
  const latest = await News.findOne({}).sort({ createdAt: -1 });
  return latest ? mapNewsItem(latest) : null;
}

import { sanitizeHtml } from './sanitize';

async function makeUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'article';
  let slug = root;
  let n = 2;
  // Append -2, -3, ... until the slug is free
  while (true) {
    const clash = await News.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) }).select('_id');
    if (!clash) return slug;
    slug = `${root}-${n++}`;
  }
}

export async function createNews(data: Partial<NewsItem>): Promise<NewsItem> {
  await dbConnect();
  // Auto-generate a unique slug from title if not provided
  if (!data.slug && data.title) {
    data.slug = await makeUniqueSlug(generateSlug(data.title));
  }
  // Sanitize content
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }
  const newItem = await News.create(data);
  safeRevalidateTag('news');
  return mapNewsItem(newItem);
}

export async function updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem | null> {
  await dbConnect();
  // Regenerate a unique slug if title changed
  if (data.title && !data.slug) {
    data.slug = await makeUniqueSlug(generateSlug(data.title), id);
  }
  // Sanitize content
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }
  const updatedItem = await News.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  safeRevalidateTag('news');
  return updatedItem ? mapNewsItem(updatedItem) : null;
}

export async function deleteNews(id: string): Promise<boolean> {
  await dbConnect();
  const result = await News.findByIdAndDelete(id);
  safeRevalidateTag('news');
  return !!result;
}

export async function filterNews(category: string, search: string): Promise<NewsItem[]> {
  await dbConnect();
  
  const query: NewsQuery = {};
  
  // Category mapping
  if (category !== 'All') {
    let normalizedCategory = category;
    if (category === 'Events') normalizedCategory = 'Event';
    query.category = normalizedCategory;
  }

  // Search logic
  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.$or = [
      { title: { $regex: escapedSearch, $options: 'i' } },
      { description: { $regex: escapedSearch, $options: 'i' } }
    ];
  }

  const news = await News.find(query).sort({ createdAt: -1 });
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

export async function getUpcomingEvents(limit = 4): Promise<UpcomingEvent[]> {
  await dbConnect();
  const now = new Date();
  const events = await News.find({ category: 'Event' });
  const monthShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return events
    .map((doc: NewsDocument) => {
      const d = new Date(doc.date);
      const id = doc._id.toString();
      return {
        raw: d,
        item: {
          id,
          slug: doc.slug || id,
          title: doc.title,
          time: doc.time,
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
  await dbConnect();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const docs = await News.aggregate<ArchiveDocument>([
    {
      $group: {
        _id: {
          y: { $year: '$createdAt' },
          m: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.y': -1, '_id.m': -1 } },
    { $limit: limit },
  ]);
  return docs.map((d) => ({
    monthIndex: d._id.m - 1,
    year: d._id.y,
    month: `${monthNames[d._id.m - 1]} ${d._id.y}`,
    count: d.count,
  }));
}

export async function getRelatedNews(category: string, currentId: string, limit = 3): Promise<NewsItem[]> {
  await dbConnect();
  const news = await News.find({
    category,
    _id: { $ne: currentId }
  })
  .sort({ createdAt: -1 })
  .limit(limit);
  
  return news.map(mapNewsItem);
}
