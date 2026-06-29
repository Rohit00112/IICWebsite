import { z } from 'zod';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../image-source';

export const homePopupSchema = z.object({
  enabled: z.boolean(),
  image: z
    .string()
    .trim()
    .min(1, 'Please provide a popup image')
    .refine(isSafeImageSrc, IMAGE_SOURCE_ERROR),
  alt: z
    .string()
    .trim()
    .max(140, 'Alt text must be 140 characters or less')
    .optional()
    .default(''),
});

export type HomePopupInput = z.infer<typeof homePopupSchema>;
