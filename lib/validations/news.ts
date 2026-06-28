import { z } from 'zod';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../image-source';

const imageSourceSchema = z.string().trim().refine(isSafeImageSrc, IMAGE_SOURCE_ERROR);

export const newsSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  slug: z.string().optional(),
  category: z.enum(['News', 'Event']),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  location: z.string().optional(),
  image: imageSourceSchema.optional().or(z.literal('')),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  content: z.string().min(20, "Content is too short"),
  featured: z.boolean().default(false),
  author: z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    avatar: imageSourceSchema.optional().or(z.literal(''))
  }).optional()
});

export const newsUpdateSchema = newsSchema.omit({ featured: true }).partial().extend({
  featured: z.boolean().optional()
});

export type NewsInput = z.infer<typeof newsSchema>;
