import { z } from 'zod';

export const newsSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  category: z.enum(['News', 'Event', 'Announcement']),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  location: z.string().optional(),
  image: z.string().url("Must be a valid image URL"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  content: z.string().min(20, "Content is too short"),
  featured: z.boolean().default(false),
  author: z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    avatar: z.string().url().optional().or(z.literal(''))
  }).optional()
});

export type NewsInput = z.infer<typeof newsSchema>;
