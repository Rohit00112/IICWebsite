import { revalidateTag } from 'next/cache';
import { logExpectedDbFallback } from './db-fallback-log';
import prisma from './db';
import { toSafeImageSrc } from './image-source';

export type ScholarshipAwardType = 'aaa' | 'ing_postgraduate';
export type ScholarshipStatus = 'draft' | 'published';

export interface ScholarshipRecipient {
  name: string;
  programme?: string;
  image?: string;
  quote?: string;
  sortOrder: number;
}

export interface ScholarshipBatch {
  id: string;
  year: number;
  awardType: ScholarshipAwardType;
  title: string;
  summary?: string;
  groupImage?: string;
  status: ScholarshipStatus;
  recipients: ScholarshipRecipient[];
  createdAt?: string;
  updatedAt?: string;
}

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
  } catch (e) {
    console.warn(`revalidateTag(${tag}) skipped:`, e);
  }
}

function dateToString(value: Date | string | undefined) {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : String(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapScholarshipBatch(doc: any): ScholarshipBatch {
  const recipientsRaw = Array.isArray(doc.recipients) ? doc.recipients : [];
  
  const recipients = recipientsRaw
    .map((recipient: Partial<ScholarshipRecipient>, index: number) => ({
      name: recipient.name || '',
      programme: recipient.programme || '',
      image: toSafeImageSrc(recipient.image),
      quote: recipient.quote || '',
      sortOrder: typeof recipient.sortOrder === 'number' ? recipient.sortOrder : index,
    }))
    .sort((a: ScholarshipRecipient, b: ScholarshipRecipient) => a.sortOrder - b.sortOrder);

  return {
    id: doc.id,
    year: Number(doc.year ?? new Date().getFullYear()),
    awardType: doc.awardType === 'ing_postgraduate' ? 'ing_postgraduate' : 'aaa',
    title: doc.title || '',
    summary: doc.summary || '',
    groupImage: toSafeImageSrc(doc.groupImage),
    status: doc.status === 'published' ? 'published' : 'draft',
    recipients,
    createdAt: dateToString(doc.createdAt),
    updatedAt: dateToString(doc.updatedAt),
  };
}

type ScholarshipQueryOptions = {
  year?: number;
  status?: ScholarshipStatus;
};

function buildQuery(options: ScholarshipQueryOptions = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};
  if (options.year !== undefined) query.year = options.year;
  if (options.status !== undefined) query.status = options.status;
  return query;
}

export async function getAllScholarshipBatches(options: ScholarshipQueryOptions = {}): Promise<ScholarshipBatch[]> {
  const docs = await prisma.scholarshipBatch.findMany({
    where: buildQuery(options),
    orderBy: [
      { year: 'desc' },
      { awardType: 'asc' },
      { createdAt: 'desc' }
    ],
  });
  return docs.map(mapScholarshipBatch);
}

export async function getPublishedScholarshipBatches(options: Omit<ScholarshipQueryOptions, 'status'> = {}): Promise<ScholarshipBatch[]> {
  try {
    return await getAllScholarshipBatches({ ...options, status: 'published' });
  } catch (error) {
    logExpectedDbFallback('[scholarships] DB unavailable, rendering empty state:', error);
    return [];
  }
}

export async function getScholarshipBatchById(id: string): Promise<ScholarshipBatch | null> {
  try {
    const doc = await prisma.scholarshipBatch.findUnique({ where: { id } });
    return doc ? mapScholarshipBatch(doc) : null;
  } catch {
    return null;
  }
}

export async function createScholarshipBatch(data: Partial<ScholarshipBatch>): Promise<ScholarshipBatch> {
  const created = await prisma.scholarshipBatch.create({
    data: {
      year: data.year ?? new Date().getFullYear(),
      awardType: data.awardType || 'aaa',
      title: data.title || '',
      summary: data.summary,
      groupImage: data.groupImage,
      status: data.status || 'draft',
      recipients: data.recipients ? JSON.parse(JSON.stringify(data.recipients)) : [],
    },
  });
  safeRevalidateTag('scholarships');
  return mapScholarshipBatch(created);
}

export async function updateScholarshipBatch(id: string, data: Partial<ScholarshipBatch>): Promise<ScholarshipBatch | null> {
  const updateData = { ...data };
  delete updateData.id;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePayload: Record<string, any> = {};
  if (updateData.year !== undefined) updatePayload.year = updateData.year;
  if (updateData.awardType !== undefined) updatePayload.awardType = updateData.awardType;
  if (updateData.title !== undefined) updatePayload.title = updateData.title;
  if (updateData.summary !== undefined) updatePayload.summary = updateData.summary;
  if (updateData.groupImage !== undefined) updatePayload.groupImage = updateData.groupImage;
  if (updateData.status !== undefined) updatePayload.status = updateData.status;
  if (updateData.recipients !== undefined) updatePayload.recipients = JSON.parse(JSON.stringify(updateData.recipients));

  try {
    const updated = await prisma.scholarshipBatch.update({
      where: { id },
      data: updatePayload,
    });
    safeRevalidateTag('scholarships');
    return mapScholarshipBatch(updated);
  } catch {
    return null;
  }
}

export async function deleteScholarshipBatch(id: string): Promise<boolean> {
  try {
    await prisma.scholarshipBatch.delete({ where: { id } });
    safeRevalidateTag('scholarships');
    return true;
  } catch {
    return false;
  }
}
