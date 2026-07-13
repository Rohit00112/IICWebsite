import prisma from './db';
import { toSafeImageSrc } from './image-source';

export interface CourseItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  level?: string;
  listing?: {
    title?: string;
    mnemonic?: string;
    mnemonicImage?: string;
    displayTitle?: string;
    specialism?: string;
    category?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    modulesLabel?: string;
    creditsLabel?: string;
    featuredModules?: string[];
    order?: number;
  };
  featured: boolean;
  overview?: string;
  details?: {
    level?: string;
    duration?: string;
    intake?: string;
    awardingBody?: string;
  };
  curriculum?: {
    title?: string;
    modules?: {
      name: string;
      code?: string;
      description?: string;
      credits?: string;
    }[];
  }[];
  learningOutcomes?: string[];
  careerOpportunities?: {
    title: string;
    description?: string;
    color?: string;
  }[];
  faculty?: {
    name: string;
    role: string;
    description?: string;
    image?: string;
    color?: string;
  }[];
  quote?: {
    text?: string;
    author?: string;
  };
  projects?: {
    title: string;
    cohort?: string;
    image?: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

import { revalidateTag } from 'next/cache';
import { sanitizeHtml } from './sanitize';

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
}

function toRecordArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
}

const placeholderPillValues = new Set(['string']);

function normalizePillLabels(items: unknown): string[] {
  if (!Array.isArray(items)) return [];

  const seen = new Set<string>();

  return items.reduce<string[]>((labels, item) => {
    const label = String(item).trim();
    const key = label.toLowerCase();

    if (!label || placeholderPillValues.has(key) || seen.has(key)) return labels;

    seen.add(key);
    labels.push(label);
    return labels;
  }, []);
}

function normalizeCourseData(data: Partial<CourseItem>): Partial<CourseItem> {
  if (!data.listing) return data;

  return {
    ...data,
    listing: {
      ...data.listing,
      featuredModules: normalizePillLabels(data.listing.featuredModules),
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCourse(doc: any): CourseItem {
  const slug = doc.slug || '';
  const description = slug === 'bsc-hons-computing' && doc.description?.trim().toLowerCase() === 'hacked_by_inred'
    ? ''
    : doc.description || '';
  const d = (doc.details as Record<string, string>) || {};
  const q = (doc.quote as Record<string, string>) || {};
  const listing = (doc.listing as Record<string, unknown>) || {};
  return {
    id: doc.id,
    title: doc.title || '',
    subtitle: doc.subtitle || '',
    slug,
    category: doc.category || '',
    duration: doc.duration || (d.duration as string) || '',
    description,
    image: toSafeImageSrc(doc.image, '/images/courses/course-hero.JPG'),
    level: doc.level,
    listing: {
      title: (listing.title as string) || '',
      mnemonic: (listing.mnemonic as string) || '',
      mnemonicImage: toSafeImageSrc(listing.mnemonicImage as string, ''),
      displayTitle: (listing.displayTitle as string) || '',
      specialism: (listing.specialism as string) || '',
      category: (listing.category as string) || '',
      description: (listing.description as string) || '',
      image: toSafeImageSrc(listing.image as string, ''),
      backgroundColor: (listing.backgroundColor as string) || '',
      modulesLabel: (listing.modulesLabel as string) || '',
      creditsLabel: (listing.creditsLabel as string) || '',
      featuredModules: normalizePillLabels(listing.featuredModules),
      order: typeof listing.order === 'number' ? listing.order : undefined,
    },
    featured: !!doc.featured,
    overview: doc.overview || '',
    details: {
      level: d.level || '',
      duration: d.duration || '',
      intake: d.intake || '',
      awardingBody: d.awardingBody || '',
    },
    curriculum: toRecordArray(doc.curriculum).map((y) => ({
      title: (y.title as string) || '',
      modules: toRecordArray(y.modules).map((m) => ({
        name: (m.name as string) || '',
        code: (m.code as string) || '',
        description: (m.description as string) || '',
        credits: (m.credits as string) || '',
      })),
    })),
    learningOutcomes: ((doc.learningOutcomes as unknown[]) || []).map((s: unknown) => String(s)),
    careerOpportunities: toRecordArray(doc.careerOpportunities).map((c) => ({
      title: (c.title as string) || '',
      description: (c.description as string) || '',
      color: (c.color as string) || '',
    })),
    faculty: toRecordArray(doc.faculty).map((f) => ({
      name: (f.name as string) || '',
      role: (f.role as string) || '',
      description: (f.description as string) || '',
      image: toSafeImageSrc(f.image, '/images/common/iic_logo.png'),
      color: (f.color as string) || '',
    })),
    quote: { text: (q.text as string) || '', author: (q.author as string) || '' },
    projects: toRecordArray(doc.projects).map((p) => ({
      title: (p.title as string) || '',
      cohort: (p.cohort as string) || '',
      image: toSafeImageSrc(p.image, '/images/course-details/course-details-hero.webp'),
    })),
    faqs: toRecordArray(doc.faqs).map((f) => ({
      question: (f.question as string) || '',
      answer: (f.answer as string) || '',
    })),
  };
}

export async function getAllCourses(): Promise<CourseItem[]> {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const mapped = courses.map(mapCourse);
  const seen = new Set<string>();

  const uniqueCourses = mapped.filter((course: CourseItem) => {
    const normalizedTitle = (course.listing?.displayTitle || course.title || '').trim().toLowerCase();
    const normalizedSpecialism = (course.listing?.specialism || '').trim().toLowerCase();
    const identityKey = `${normalizedTitle}::${normalizedSpecialism}`;

    if (seen.has(identityKey)) return false;
    seen.add(identityKey);
    return true;
  });

  return uniqueCourses.sort((a: CourseItem, b: CourseItem) => {
    const aOrder = a.listing?.order;
    const bOrder = b.listing?.order;

    if (typeof aOrder === 'number' && typeof bOrder === 'number' && aOrder !== bOrder) return aOrder - bOrder;
    if (typeof aOrder === 'number') return -1;
    if (typeof bOrder === 'number') return 1;
    return 0;
  });
}

export async function getCourseBySlug(slug: string): Promise<CourseItem | null> {
  const item = await prisma.course.findFirst({ where: { slug } });
  return item ? mapCourse(item) : null;
}

export async function getCourseById(id: string): Promise<CourseItem | null> {
  try {
    const item = await prisma.course.findUnique({ where: { id } });
    return item ? mapCourse(item) : null;
  } catch {
    return null;
  }
}

export async function createCourse(data: Partial<CourseItem>): Promise<CourseItem> {
  const normalizedData = normalizeCourseData(data);
  if (normalizedData.overview) {
    normalizedData.overview = sanitizeHtml(normalizedData.overview);
  }
  const newItem = await prisma.course.create({
    data: {
      title: normalizedData.title || '',
      subtitle: normalizedData.subtitle,
      slug: normalizedData.slug || '',
      category: normalizedData.category,
      duration: normalizedData.duration,
      description: normalizedData.description,
      image: normalizedData.image,
      level: normalizedData.level,
      listing: normalizedData.listing ? JSON.parse(JSON.stringify(normalizedData.listing)) : undefined,
      featured: normalizedData.featured ?? false,
      overview: normalizedData.overview,
      details: normalizedData.details ? JSON.parse(JSON.stringify(normalizedData.details)) : undefined,
      curriculum: normalizedData.curriculum ? JSON.parse(JSON.stringify(normalizedData.curriculum)) : undefined,
      learningOutcomes: normalizedData.learningOutcomes ? JSON.parse(JSON.stringify(normalizedData.learningOutcomes)) : undefined,
      careerOpportunities: normalizedData.careerOpportunities ? JSON.parse(JSON.stringify(normalizedData.careerOpportunities)) : undefined,
      faculty: normalizedData.faculty ? JSON.parse(JSON.stringify(normalizedData.faculty)) : undefined,
      quote: normalizedData.quote ? JSON.parse(JSON.stringify(normalizedData.quote)) : undefined,
      projects: normalizedData.projects ? JSON.parse(JSON.stringify(normalizedData.projects)) : undefined,
      faqs: normalizedData.faqs ? JSON.parse(JSON.stringify(normalizedData.faqs)) : undefined,
    },
  });
  safeRevalidateTag('courses');
  return mapCourse(newItem);
}

export async function updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem | null> {
  const normalizedData = normalizeCourseData(data);
  if (normalizedData.overview) {
    normalizedData.overview = sanitizeHtml(normalizedData.overview);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePayload: Record<string, any> = {};
  if (normalizedData.title !== undefined) updatePayload.title = normalizedData.title;
  if (normalizedData.subtitle !== undefined) updatePayload.subtitle = normalizedData.subtitle;
  if (normalizedData.slug !== undefined) updatePayload.slug = normalizedData.slug;
  if (normalizedData.category !== undefined) updatePayload.category = normalizedData.category;
  if (normalizedData.duration !== undefined) updatePayload.duration = normalizedData.duration;
  if (normalizedData.description !== undefined) updatePayload.description = normalizedData.description;
  if (normalizedData.image !== undefined) updatePayload.image = normalizedData.image;
  if (normalizedData.level !== undefined) updatePayload.level = normalizedData.level;
  if (normalizedData.listing !== undefined) updatePayload.listing = JSON.parse(JSON.stringify(normalizedData.listing));
  if (normalizedData.featured !== undefined) updatePayload.featured = normalizedData.featured;
  if (normalizedData.overview !== undefined) updatePayload.overview = normalizedData.overview;
  if (normalizedData.details !== undefined) updatePayload.details = JSON.parse(JSON.stringify(normalizedData.details));
  if (normalizedData.curriculum !== undefined) updatePayload.curriculum = JSON.parse(JSON.stringify(normalizedData.curriculum));
  if (normalizedData.learningOutcomes !== undefined) updatePayload.learningOutcomes = JSON.parse(JSON.stringify(normalizedData.learningOutcomes));
  if (normalizedData.careerOpportunities !== undefined) updatePayload.careerOpportunities = JSON.parse(JSON.stringify(normalizedData.careerOpportunities));
  if (normalizedData.faculty !== undefined) updatePayload.faculty = JSON.parse(JSON.stringify(normalizedData.faculty));
  if (normalizedData.quote !== undefined) updatePayload.quote = JSON.parse(JSON.stringify(normalizedData.quote));
  if (normalizedData.projects !== undefined) updatePayload.projects = JSON.parse(JSON.stringify(normalizedData.projects));
  if (normalizedData.faqs !== undefined) updatePayload.faqs = JSON.parse(JSON.stringify(normalizedData.faqs));

  try {
    const updatedItem = await prisma.course.update({
      where: { id },
      data: updatePayload,
    });
    safeRevalidateTag('courses');
    return mapCourse(updatedItem);
  } catch {
    return null;
  }
}

export async function deleteCourse(id: string): Promise<boolean> {
  try {
    await prisma.course.delete({ where: { id } });
    safeRevalidateTag('courses');
    return true;
  } catch {
    return false;
  }
}
