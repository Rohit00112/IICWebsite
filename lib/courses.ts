import dbConnect from './db';
import Course from '../models/Course';

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

import { unstable_cache, revalidateTag } from 'next/cache';

function mapCourse(doc: any): CourseItem {
  const plain = typeof doc.toObject === 'function'
    ? doc.toObject({ depopulate: true, virtuals: false, flattenObjectIds: true, versionKey: false })
    : doc;
  const d = plain.details || {};
  const q = plain.quote || {};
  return {
    id: plain._id?.toString?.() ?? String(plain._id),
    title: plain.title,
    subtitle: plain.subtitle || '',
    slug: plain.slug,
    category: plain.category,
    duration: plain.duration,
    description: plain.description,
    image: plain.image,
    level: plain.level,
    featured: !!plain.featured,
    overview: plain.overview || '',
    details: {
      level: d.level || '',
      duration: d.duration || '',
      intake: d.intake || '',
      awardingBody: d.awardingBody || '',
    },
    curriculum: (plain.curriculum || []).map((y: any) => ({
      title: y.title || '',
      modules: (y.modules || []).map((m: any) => ({
        name: m.name || '',
        description: m.description || '',
        credits: m.credits || '',
      })),
    })),
    learningOutcomes: (plain.learningOutcomes || []).map((s: any) => String(s)),
    careerOpportunities: (plain.careerOpportunities || []).map((c: any) => ({
      title: c.title || '',
      description: c.description || '',
      color: c.color || '',
    })),
    faculty: (plain.faculty || []).map((f: any) => ({
      name: f.name || '',
      role: f.role || '',
      description: f.description || '',
      image: f.image || '',
      color: f.color || '',
    })),
    quote: { text: q.text || '', author: q.author || '' },
    projects: (plain.projects || []).map((p: any) => ({
      title: p.title || '',
      cohort: p.cohort || '',
      image: p.image || '',
    })),
    faqs: (plain.faqs || []).map((f: any) => ({
      question: f.question || '',
      answer: f.answer || '',
    })),
  };
}

export const getAllCourses = unstable_cache(
  async (): Promise<CourseItem[]> => {
    await dbConnect();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return courses.map(mapCourse);
  },
  ['courses-list'],
  { revalidate: 3600, tags: ['courses'] }
);

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
  } catch (error) {
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
  revalidateTag('courses');
  return mapCourse(newItem);
}

export async function updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem | null> {
  await dbConnect();
  if (data.overview) {
    data.overview = sanitizeHtml(data.overview);
  }
  const updatedItem = await Course.findByIdAndUpdate(id, data, { new: true });
  revalidateTag('courses');
  return updatedItem ? mapCourse(updatedItem) : null;
}

export async function deleteCourse(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Course.findByIdAndDelete(id);
  revalidateTag('courses');
  return !!result;
}
