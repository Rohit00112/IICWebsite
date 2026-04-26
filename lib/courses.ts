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
  entryRequirements?: {
    academic?: string;
    language?: string;
  };
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

import { unstable_cache } from 'next/cache';

function mapCourse(doc: any): CourseItem {
  return {
    id: doc._id.toString(),
    title: doc.title,
    subtitle: doc.subtitle || '',
    slug: doc.slug,
    category: doc.category,
    duration: doc.duration,
    description: doc.description,
    image: doc.image,
    level: doc.level,
    featured: doc.featured,
    overview: doc.overview || '',
    details: doc.details || { level: '', duration: '', intake: '', awardingBody: '' },
    curriculum: doc.curriculum || [],
    entryRequirements: doc.entryRequirements || { academic: '', language: '' },
    learningOutcomes: doc.learningOutcomes || [],
    careerOpportunities: doc.careerOpportunities || [],
    faculty: doc.faculty || [],
    quote: doc.quote || { text: '', author: '' },
    projects: doc.projects || [],
    faqs: doc.faqs || [],
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
  // Sanitize overview
  if (data.overview) {
    data.overview = sanitizeHtml(data.overview);
  }
  const newItem = await Course.create(data);
  return mapCourse(newItem);
}

export async function updateCourse(id: string, data: Partial<CourseItem>): Promise<CourseItem | null> {
  await dbConnect();
  // Sanitize overview
  if (data.overview) {
    data.overview = sanitizeHtml(data.overview);
  }
  const updatedItem = await Course.findByIdAndUpdate(id, data, { new: true });
  return updatedItem ? mapCourse(updatedItem) : null;
}

export async function deleteCourse(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Course.findByIdAndDelete(id);
  return !!result;
}
