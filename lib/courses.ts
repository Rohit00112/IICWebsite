import dbConnect from './db';
import Course from '../models/Course';
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

type CourseDocument = Partial<Omit<CourseItem, 'id'>> & {
  _id?: unknown;
  toObject?: (options: Record<string, boolean>) => CourseDocument;
  learningOutcomes?: unknown[];
};

import { revalidateTag } from 'next/cache';
import { sanitizeHtml } from './sanitize';

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
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

function mapCourse(doc: CourseDocument): CourseItem {
  const plain = typeof doc.toObject === 'function'
    ? doc.toObject({ depopulate: true, virtuals: false, flattenObjectIds: true, versionKey: false })
    : doc;
  const slug = plain.slug || '';
  const description = slug === 'bsc-hons-computing' && plain.description?.trim().toLowerCase() === 'hacked_by_inred'
    ? ''
    : plain.description || '';
  const d = plain.details || {};
  const q = plain.quote || {};
  const listing = plain.listing || {};
  return {
    id: String(plain._id ?? ''),
    title: plain.title || '',
    subtitle: plain.subtitle || '',
    slug,
    category: plain.category || '',
    duration: plain.duration || d.duration || '',
    description,
    image: toSafeImageSrc(plain.image, '/images/courses/course-hero.png'),
    level: plain.level,
    listing: {
      title: listing.title || '',
      mnemonic: listing.mnemonic || '',
      mnemonicImage: toSafeImageSrc(listing.mnemonicImage, ''),
      displayTitle: listing.displayTitle || '',
      specialism: listing.specialism || '',
      category: listing.category || '',
      description: listing.description || '',
      image: toSafeImageSrc(listing.image, ''),
      backgroundColor: listing.backgroundColor || '',
      modulesLabel: listing.modulesLabel || '',
      creditsLabel: listing.creditsLabel || '',
      featuredModules: normalizePillLabels(listing.featuredModules),
      order: typeof listing.order === 'number' ? listing.order : undefined,
    },
    featured: !!plain.featured,
    overview: plain.overview || '',
    details: {
      level: d.level || '',
      duration: d.duration || '',
      intake: d.intake || '',
      awardingBody: d.awardingBody || '',
    },
    curriculum: (plain.curriculum || []).map((y) => ({
      title: y.title || '',
      modules: (y.modules || []).map((m) => ({
        name: m.name || '',
        code: m.code || '',
        description: m.description || '',
        credits: m.credits || '',
      })),
    })),
    learningOutcomes: (plain.learningOutcomes || []).map((s) => String(s)),
    careerOpportunities: (plain.careerOpportunities || []).map((c) => ({
      title: c.title || '',
      description: c.description || '',
      color: c.color || '',
    })),
    faculty: (plain.faculty || []).map((f) => ({
      name: f.name || '',
      role: f.role || '',
      description: f.description || '',
      image: toSafeImageSrc(f.image, '/images/common/iic_logo.png'),
      color: f.color || '',
    })),
    quote: { text: q.text || '', author: q.author || '' },
    projects: (plain.projects || []).map((p) => ({
      title: p.title || '',
      cohort: p.cohort || '',
      image: toSafeImageSrc(p.image, '/images/course-details/course-details-hero.png'),
    })),
    faqs: (plain.faqs || []).map((f) => ({
      question: f.question || '',
      answer: f.answer || '',
    })),
  };
}

export async function getAllCourses(): Promise<CourseItem[]> {
  await dbConnect();
  const courses = await Course.find({}).sort({ createdAt: -1 });
  return courses.map(mapCourse).sort((a, b) => {
    const aOrder = a.listing?.order;
    const bOrder = b.listing?.order;

    if (typeof aOrder === 'number' && typeof bOrder === 'number' && aOrder !== bOrder) return aOrder - bOrder;
    if (typeof aOrder === 'number') return -1;
    if (typeof bOrder === 'number') return 1;
    return 0;
  });
}

export async function getCourseBySlug(slug: string): Promise<CourseItem | null> {
  await dbConnect();
  const item = await Course.findOne({ slug });
  return item ? mapCourse(item) : null;
}

export async function getCourseById(id: string): Promise<CourseItem | null> {
  await dbConnect();
  try {
    const item = await Course.findById(id);
    return item ? mapCourse(item) : null;
  } catch {
    return null;
  }
}

export async function createCourse(data: Partial<CourseItem>): Promise<CourseItem> {
  await dbConnect();
  const normalizedData = normalizeCourseData(data);
  if (normalizedData.overview) {
    normalizedData.overview = sanitizeHtml(normalizedData.overview);
  }
  const newItem = await Course.create(normalizedData);
  safeRevalidateTag('courses');
  return mapCourse(newItem);
}

export async function updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem | null> {
  await dbConnect();
  const normalizedData = normalizeCourseData(data);
  if (normalizedData.overview) {
    normalizedData.overview = sanitizeHtml(normalizedData.overview);
  }
  const updatedItem = await Course.findByIdAndUpdate(id, normalizedData, {
    new: true,
    runValidators: true,
    // The request payload has already been filtered by Zod. This keeps newly
    // added fields intact while a development model is being hot-reloaded.
    strict: false,
  });
  safeRevalidateTag('courses');
  return updatedItem ? mapCourse(updatedItem) : null;
}

export async function deleteCourse(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Course.findByIdAndDelete(id);
  safeRevalidateTag('courses');
  return !!result;
}
