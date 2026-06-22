import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getSession } from '../../../lib/auth';
import { rateLimit } from '../../../lib/rate-limit';
import { createScholarshipBatch, getAllScholarshipBatches, getPublishedScholarshipBatches } from '../../../lib/scholarships';
import { scholarshipBatchSchema } from '../../../lib/validations/scholarship';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const includeDrafts = searchParams.get('includeDrafts') === 'true';
  const year = yearParam ? Number(yearParam) : undefined;

  try {
    if (year !== undefined && (!Number.isInteger(year) || year < 2000 || year > 2100)) {
      return NextResponse.json({ error: 'Invalid scholarship year' }, { status: 400 });
    }

    if (includeDrafts) {
      const session = await getSession().catch(() => null);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const batches = await getAllScholarshipBatches({ year });
      return NextResponse.json(batches);
    }

    const batches = await getPublishedScholarshipBatches({ year });
    return NextResponse.json(batches);
  } catch (error) {
    console.error('GET /api/scholarships error:', error);
    return NextResponse.json({ error: 'Failed to fetch scholarships' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`scholarship-create-${ip}`, 10, 60 * 1000);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const session = await getSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = scholarshipBatchSchema.parse(body);
    const batch = await createScholarshipBatch(validatedData);
    return NextResponse.json(batch, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(e => ({ path: e.path, message: e.message })),
      }, { status: 400 });
    }
    console.error('POST /api/scholarships error:', error);
    return NextResponse.json({ error: 'Failed to create scholarship batch' }, { status: 500 });
  }
}
