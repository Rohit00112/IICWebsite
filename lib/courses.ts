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

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
}

function mapCourse(doc: CourseDocument): CourseItem {
  const plain = typeof doc.toObject === 'function'
    ? doc.toObject({ depopulate: true, virtuals: false, flattenObjectIds: true, versionKey: false })
    : doc;
  const d = plain.details || {};
  const q = plain.quote || {};
  return {
    id: String(plain._id ?? ''),
    title: plain.title || '',
    subtitle: plain.subtitle || '',
    slug: plain.slug || '',
    category: plain.category || '',
    duration: plain.duration || d.duration || '',
    description: plain.description || '',
    image: toSafeImageSrc(plain.image, '/images/courses/course-hero.png'),
    level: plain.level,
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
  return courses.map(mapCourse);
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

import { sanitizeHtml } from './sanitize';

export async function createCourse(data: Partial<CourseItem>): Promise<CourseItem> {
  await dbConnect();
  if (data.overview) {
    data.overview = sanitizeHtml(data.overview);
  }
  const newItem = await Course.create(data);
  safeRevalidateTag('courses');
  return mapCourse(newItem);
}

export async function updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem | null> {
  await dbConnect();
  if (data.overview) {
    data.overview = sanitizeHtml(data.overview);
  }
  const updatedItem = await Course.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  safeRevalidateTag('courses');
  return updatedItem ? mapCourse(updatedItem) : null;
}

export async function deleteCourse(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Course.findByIdAndDelete(id);
  safeRevalidateTag('courses');
  return !!result;
}
