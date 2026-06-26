import { z } from 'zod';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../image-source';

const imageSourceSchema = z.string().trim().refine(isSafeImageSrc, IMAGE_SOURCE_ERROR);

export const eventGallerySchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(1).max(140).optional(),
  year: z.coerce.number().int().min(2000).max(2100),
  summary: z.string().trim().min(10).max(500),
  coverImage: imageSourceSchema,
  images: z.array(imageSourceSchema).max(60).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
});

export const eventGalleryUpdateSchema = eventGallerySchema.partial();

export type EventGalleryInput = z.infer<typeof eventGallerySchema>;
