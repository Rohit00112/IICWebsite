import { z } from 'zod';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../image-source';

const optionalImageSourceSchema = z.string().trim().refine(isSafeImageSrc, IMAGE_SOURCE_ERROR).optional().or(z.literal(''));

export const scholarshipAwardTypeSchema = z.enum(['aaa', 'ing_postgraduate']);
export const scholarshipStatusSchema = z.enum(['draft', 'published']);
const ingSingleRecipientMessage = 'ING Postgraduate Scholarship can have only one recipient per year';

const scholarshipRecipientSchema = z.object({
  name: z.string().trim().min(2, 'Recipient name is required').max(120),
  programme: z.string().trim().max(160).optional().or(z.literal('')),
  image: optionalImageSourceSchema,
  quote: z.string().trim().max(500).optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const scholarshipBatchBaseSchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  awardType: scholarshipAwardTypeSchema,
  title: z.string().trim().min(3, 'Batch title is required').max(160),
  summary: z.string().trim().max(700).optional().or(z.literal('')),
  groupImage: optionalImageSourceSchema,
  status: scholarshipStatusSchema.default('draft'),
  recipients: z.array(scholarshipRecipientSchema).default([]),
});

function enforceScholarshipRules(
  data: { awardType?: z.infer<typeof scholarshipAwardTypeSchema>; recipients?: unknown[] },
  ctx: z.RefinementCtx
) {
  if (data.awardType === 'ing_postgraduate' && data.recipients && data.recipients.length > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['recipients'],
      message: ingSingleRecipientMessage,
    });
  }
}

export const scholarshipBatchSchema = scholarshipBatchBaseSchema.superRefine(enforceScholarshipRules);

export const scholarshipBatchUpdateSchema = scholarshipBatchBaseSchema.partial().extend({
  id: z.string().optional(),
}).superRefine(enforceScholarshipRules);

export type ScholarshipBatchInput = z.infer<typeof scholarshipBatchSchema>;
export type ScholarshipBatchUpdateInput = z.infer<typeof scholarshipBatchUpdateSchema>;
