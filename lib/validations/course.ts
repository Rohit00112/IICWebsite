import { z } from 'zod';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../image-source';

const imageSourceSchema = z.string().trim().refine(isSafeImageSrc, IMAGE_SOURCE_ERROR);
const optionalImageSourceSchema = imageSourceSchema.optional().or(z.literal(''));
const optionalHexColorSchema = z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/, 'Use a valid hex colour, e.g. #21409A.').optional().or(z.literal(''));
const placeholderPillValues = new Set(['string']);
const topModulePillsSchema = z.array(z.string()).transform((items) => (
  items
    .map((item) => item.trim())
    .filter((item, index, arr) => (
      item.length > 0 &&
      !placeholderPillValues.has(item.toLowerCase()) &&
      arr.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index
    ))
));

export const courseSchema = z.object({
  title: z.string().min(5).max(100),
  slug: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  category: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(10),
  image: imageSourceSchema,
  level: z.string().optional(),
  listing: z.object({
    title: z.string().optional(),
    displayTitle: z.string().max(70).optional(),
    specialism: z.string().max(90).optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    image: optionalImageSourceSchema,
    backgroundColor: optionalHexColorSchema,
    modulesLabel: z.string().optional(),
    creditsLabel: z.string().optional(),
    featuredModules: topModulePillsSchema.optional(),
    order: z.coerce.number().optional()
  }).optional(),
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
      code: z.string().max(30).optional(),
      description: z.string().optional(),
      credits: z.string().optional()
    }))
  })).optional(),
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
    image: optionalImageSourceSchema,
    color: z.string().optional()
  })).optional(),
  quote: z.object({
    text: z.string().optional(),
    author: z.string().optional()
  }).optional(),
  projects: z.array(z.object({
    title: z.string(),
    cohort: z.string().optional(),
    image: optionalImageSourceSchema
  })).optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional()
});

export const courseUpdateSchema = courseSchema.omit({ featured: true }).partial().extend({
  featured: z.boolean().optional(),
  id: z.string().optional()
});

export type CourseInput = z.infer<typeof courseSchema>;
