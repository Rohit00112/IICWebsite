import { revalidateTag } from 'next/cache';
import dbConnect from './db';
import ScholarshipBatch from '../models/ScholarshipBatch';
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

type ScholarshipRecipientDocument = Partial<ScholarshipRecipient>;

type ScholarshipBatchDocument = Partial<Omit<ScholarshipBatch, 'id' | 'createdAt' | 'updatedAt'>> & {
  _id?: unknown;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  recipients?: ScholarshipRecipientDocument[];
  toObject?: (options: Record<string, boolean>) => ScholarshipBatchDocument;
};

type ScholarshipQueryOptions = {
  year?: number;
  status?: ScholarshipStatus;
};

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

function mapScholarshipBatch(doc: ScholarshipBatchDocument): ScholarshipBatch {
  const plain = typeof doc.toObject === 'function'
    ? doc.toObject({ depopulate: true, virtuals: false, flattenObjectIds: true, versionKey: false })
    : doc;

  const recipients = (plain.recipients || [])
    .map((recipient, index) => ({
      name: recipient.name || '',
      programme: recipient.programme || '',
      image: toSafeImageSrc(recipient.image),
      quote: recipient.quote || '',
      sortOrder: typeof recipient.sortOrder === 'number' ? recipient.sortOrder : index,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: String(plain._id ?? ''),
    year: Number(plain.year ?? new Date().getFullYear()),
    awardType: plain.awardType === 'ing_postgraduate' ? 'ing_postgraduate' : 'aaa',
    title: plain.title || '',
    summary: plain.summary || '',
    groupImage: toSafeImageSrc(plain.groupImage),
    status: plain.status === 'published' ? 'published' : 'draft',
    recipients,
    createdAt: dateToString(plain.createdAt),
    updatedAt: dateToString(plain.updatedAt),
  };
}

function buildQuery(options: ScholarshipQueryOptions = {}) {
  const query: Record<string, unknown> = {};
  if (options.year) query.year = options.year;
  if (options.status) query.status = options.status;
  return query;
}

export async function getAllScholarshipBatches(options: ScholarshipQueryOptions = {}): Promise<ScholarshipBatch[]> {
  await dbConnect();
  const docs = await ScholarshipBatch.find(buildQuery(options)).sort({ year: -1, awardType: 1, createdAt: -1 });
  return docs.map(mapScholarshipBatch);
}

export async function getPublishedScholarshipBatches(options: Omit<ScholarshipQueryOptions, 'status'> = {}): Promise<ScholarshipBatch[]> {
  return getAllScholarshipBatches({ ...options, status: 'published' });
}

export async function getScholarshipBatchById(id: string): Promise<ScholarshipBatch | null> {
  await dbConnect();
  try {
    const doc = await ScholarshipBatch.findById(id);
    return doc ? mapScholarshipBatch(doc) : null;
  } catch {
    return null;
  }
}

export async function createScholarshipBatch(data: Partial<ScholarshipBatch>): Promise<ScholarshipBatch> {
  await dbConnect();
  const created = await ScholarshipBatch.create(data);
  safeRevalidateTag('scholarships');
  return mapScholarshipBatch(created);
}

export async function updateScholarshipBatch(id: string, data: Partial<ScholarshipBatch>): Promise<ScholarshipBatch | null> {
  await dbConnect();
  const doc = await ScholarshipBatch.findById(id);
  if (!doc) return null;

  const updateData = { ...data };
  delete updateData.id;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  doc.set(updateData);
  const updated = await doc.save();
  safeRevalidateTag('scholarships');
  return mapScholarshipBatch(updated);
}

export async function deleteScholarshipBatch(id: string): Promise<boolean> {
  await dbConnect();
  const result = await ScholarshipBatch.findByIdAndDelete(id);
  safeRevalidateTag('scholarships');
  return !!result;
}
