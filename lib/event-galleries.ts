import { revalidateTag } from 'next/cache';
import { logExpectedDbFallback } from './db-fallback-log';
import prisma from './db';
import { toSafeImageSrc } from './image-source';

export type EventGalleryStatus = 'draft' | 'published';

export interface EventGalleryItem {
  id: string;
  title: string;
  slug: string;
  year: number;
  summary: string;
  coverImage: string;
  images: string[];
  status: EventGalleryStatus;
  sortOrder: number;
}

export interface EventGalleryArchive {
  title: string;
  slug: string;
  coverImage: string;
  summary: string;
  galleries: EventGalleryItem[];
}

const defaultGalleries: EventGalleryItem[] = [
  {
    id: 'default-spring-carnival',
    title: 'Spring Carnival',
    slug: 'spring-carnival',
    year: 2025,
    summary: 'A college-wide celebration of music, food, and student-led performances marking the season.',
    coverImage: '/images/lifestyle/carnival.JPG',
    images: ['/images/lifestyle/carnival.JPG'],
    status: 'published',
    sortOrder: 1,
  },
  {
    id: 'default-iicquest',
    title: 'IICQuest',
    slug: 'iicquest',
    year: 2025,
    summary: 'Our flagship inter-college tech and quiz challenge where teams compete across rounds of logic and creativity.',
    coverImage: '/images/lifestyle/quest.JPG',
    images: ['/images/lifestyle/quest.JPG'],
    status: 'published',
    sortOrder: 2,
  },
  {
    id: 'default-innovex',
    title: 'Innovex',
    slug: 'innovex',
    year: 2025,
    summary: 'An innovation showcase where students present prototypes, research, and startup ideas to industry mentors.',
    coverImage: '/images/lifestyle/innovex.JPG',
    images: ['/images/lifestyle/innovex.JPG'],
    status: 'published',
    sortOrder: 3,
  },
  {
    id: 'default-holi',
    title: 'Holi',
    slug: 'holi',
    year: 2025,
    summary: 'Colors, music, and community across the IIC student body.',
    coverImage: '/images/lifestyle/holi.jpg',
    images: ['/images/lifestyle/holi.jpg'],
    status: 'published',
    sortOrder: 4,
  },
  {
    id: 'default-sports-week',
    title: 'Sports Week',
    slug: 'sports-week',
    year: 2025,
    summary: 'A week of futsal, basketball, table tennis, and athletics across the college.',
    coverImage: '/images/lifestyle/sports-week.JPG',
    images: ['/images/lifestyle/sports-week.JPG'],
    status: 'published',
    sortOrder: 5,
  },
  {
    id: 'default-creative-clash',
    title: 'Creative Clash',
    slug: 'creative-clash',
    year: 2025,
    summary: 'A design and creative arts face-off for film, photography, music, and visual storytelling.',
    coverImage: '/images/lifestyle/creative-clash.JPG',
    images: ['/images/lifestyle/creative-clash.JPG'],
    status: 'published',
    sortOrder: 6,
  },
  {
    id: 'default-strategic-edge',
    title: 'Strategic Edge',
    slug: 'strategic-edge',
    year: 2025,
    summary: 'A business strategy and case competition built around real-world scenarios.',
    coverImage: '/images/lifestyle/strategic.JPG',
    images: ['/images/lifestyle/strategic.JPG'],
    status: 'published',
    sortOrder: 7,
  },
  {
    id: 'default-graduation',
    title: 'Graduation',
    slug: 'graduation',
    year: 2025,
    summary: 'A celebration of every cohort as they step into their global careers.',
    coverImage: '/images/lifestyle/graduation.JPG',
    images: ['/images/lifestyle/graduation.JPG'],
    status: 'published',
    sortOrder: 8,
  },
  {
    id: 'default-christmas',
    title: 'Christmas',
    slug: 'christmas',
    year: 2025,
    summary: 'A warm end-of-year gathering for students, faculty, and families.',
    coverImage: '/images/lifestyle/christmas.JPG',
    images: ['/images/lifestyle/christmas.JPG'],
    status: 'published',
    sortOrder: 9,
  },
];

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getGallerySlug(data: Partial<EventGalleryItem>) {
  const customSlug = data.slug ? generateSlug(data.slug) : '';
  return customSlug || generateSlug(`${data.title || ''}-${data.year || ''}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEventGallery(doc: any): EventGalleryItem {
  const images = Array.isArray(doc.images) ? doc.images : [];

  return {
    id: doc.id,
    title: doc.title || '',
    slug: doc.slug || '',
    year: typeof doc.year === 'number' ? doc.year : new Date().getFullYear(),
    summary: doc.summary || '',
    coverImage: toSafeImageSrc(doc.coverImage, '/images/lifestyle/lifestyle-hero.JPG'),
    images: images.map((image: string) => toSafeImageSrc(image)).filter(Boolean),
    status: doc.status === 'published' ? 'published' : 'draft',
    sortOrder: typeof doc.sortOrder === 'number' ? doc.sortOrder : 0,
  };
}

function sortGalleries(galleries: EventGalleryItem[]) {
  return galleries.sort((a, b) => b.year - a.year || a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

function getDefaultPublishedGalleries() {
  return sortGalleries([...defaultGalleries]);
}

function getEventArchiveSlug(title: string) {
  return generateSlug(title);
}

function toEventGalleryArchives(galleries: EventGalleryItem[]): EventGalleryArchive[] {
  const byEvent = new Map<string, EventGalleryItem[]>();

  for (const gallery of galleries) {
    const slug = getEventArchiveSlug(gallery.title);
    const eventGalleries = byEvent.get(slug) || [];
    eventGalleries.push(gallery);
    byEvent.set(slug, eventGalleries);
  }

  return [...byEvent.entries()]
    .map(([slug, eventGalleries]) => {
      const galleriesByYear = sortGalleries(eventGalleries);
      const latestGallery = galleriesByYear[0];

      return {
        title: latestGallery.title,
        slug,
        coverImage: latestGallery.coverImage,
        summary: latestGallery.summary,
        galleries: galleriesByYear,
      };
    })
    .sort((a, b) => b.galleries[0].year - a.galleries[0].year || a.title.localeCompare(b.title));
}

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (error) {
    console.warn(`revalidateTag(${tag}) skipped:`, error);
  }
}

export async function getAllEventGalleries(): Promise<EventGalleryItem[]> {
  const galleries = await prisma.eventGallery.findMany({
    orderBy: [{ year: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return galleries.map(mapEventGallery);
}

export async function getPublishedEventGalleries(): Promise<EventGalleryItem[]> {
  let galleries: EventGalleryItem[] = [];

  try {
    galleries = await getAllEventGalleries();
  } catch (error) {
    logExpectedDbFallback('[event-galleries] DB unavailable, rendering default galleries:', error);
    return getDefaultPublishedGalleries();
  }

  const published = galleries.filter((gallery) => gallery.status === 'published');
  const galleryBySlug = new Map(published.map((gallery) => [gallery.slug, gallery]));
  const publishedTitles = new Set(published.map((gallery) => gallery.title.trim().toLowerCase()));

  for (const gallery of defaultGalleries) {
    if (!publishedTitles.has(gallery.title.toLowerCase()) && !galleryBySlug.has(gallery.slug)) {
      galleryBySlug.set(gallery.slug, gallery);
    }
  }

  return sortGalleries([...galleryBySlug.values()]);
}

export async function getPublishedEventGalleryArchives(): Promise<EventGalleryArchive[]> {
  return toEventGalleryArchives(await getPublishedEventGalleries());
}

export async function getEventGalleryById(id: string): Promise<EventGalleryItem | null> {
  try {
    const gallery = await prisma.eventGallery.findUnique({ where: { id } });
    return gallery ? mapEventGallery(gallery) : null;
  } catch {
    return null;
  }
}

export async function getPublishedEventGalleryBySlug(slug: string): Promise<EventGalleryItem | null> {
  try {
    const gallery = await prisma.eventGallery.findFirst({
      where: { slug, status: 'published' },
    });
    if (gallery) return mapEventGallery(gallery);
  } catch (error) {
    logExpectedDbFallback('[event-galleries] DB unavailable, rendering default gallery by slug:', error);
  }

  return defaultGalleries.find((item) => item.slug === slug) || null;
}

export async function getPublishedEventGalleryArchiveBySlug(slug: string): Promise<EventGalleryArchive | null> {
  const archives = await getPublishedEventGalleryArchives();
  return archives.find((archive) => archive.slug === slug) || null;
}

export async function createEventGallery(data: Partial<EventGalleryItem>): Promise<EventGalleryItem> {
  const gallery = await prisma.eventGallery.create({
    data: {
      title: data.title || '',
      slug: getGallerySlug(data),
      year: data.year || new Date().getFullYear(),
      summary: data.summary || '',
      coverImage: data.coverImage || '',
      images: data.images ? JSON.parse(JSON.stringify(data.images)) : [],
      status: data.status || 'draft',
      sortOrder: data.sortOrder ?? 0,
    },
  });
  safeRevalidateTag('event-galleries');
  return mapEventGallery(gallery);
}

export async function updateEventGallery(id: string, data: Partial<EventGalleryItem>): Promise<EventGalleryItem | null> {
  const update = data.slug ? { ...data, slug: getGallerySlug(data) } : data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePayload: Record<string, any> = {};
  if (update.title !== undefined) updatePayload.title = update.title;
  if (update.slug !== undefined) updatePayload.slug = update.slug;
  if (update.year !== undefined) updatePayload.year = update.year;
  if (update.summary !== undefined) updatePayload.summary = update.summary;
  if (update.coverImage !== undefined) updatePayload.coverImage = update.coverImage;
  if (update.images !== undefined) updatePayload.images = JSON.parse(JSON.stringify(update.images));
  if (update.status !== undefined) updatePayload.status = update.status;
  if (update.sortOrder !== undefined) updatePayload.sortOrder = update.sortOrder;

  try {
    const gallery = await prisma.eventGallery.update({
      where: { id },
      data: updatePayload,
    });
    safeRevalidateTag('event-galleries');
    return mapEventGallery(gallery);
  } catch {
    return null;
  }
}

export async function deleteEventGallery(id: string): Promise<boolean> {
  try {
    await prisma.eventGallery.delete({ where: { id } });
    safeRevalidateTag('event-galleries');
    return true;
  } catch {
    return false;
  }
}
