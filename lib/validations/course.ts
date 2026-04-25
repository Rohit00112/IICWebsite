import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().optional(),
  category: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(10),
  image: z.string().url(),
  level: z.string().optional(),
  featured: z.boolean().default(false),
  overview: z.string().optional(),
  details: z.object({
    level: z.string().optional(),
    duration: z.string().optional(),
    intake: z.string().optional(),
    awardingBody: z.string().optional()
  }).optional(),
  curriculum: z.array(z.object({
    title: z.string(),
    modules: z.array(z.object({
      name: z.string(),
      description: z.string().optional(),
      credits: z.string().optional()
    }))
  })).optional(),
  entryRequirements: z.object({
    academic: z.string().optional(),
    language: z.string().optional()
  }).optional(),
  learningOutcomes: z.array(z.string()).optional(),
  careerOpportunities: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    color: z.string().optional()
  })).optional(),
  faculty: z.array(z.object({
    name: z.string(),
    role: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    color: z.string().optional()
  })).optional(),
  quote: z.object({
    text: z.string().optional(),
    author: z.string().optional()
  }).optional(),
  projects: z.array(z.object({
    title: z.string(),
    cohort: z.string().optional(),
    image: z.string().url().optional()
  })).optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional()
});

export type CourseInput = z.infer<typeof courseSchema>;
