import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getSession } from '../../../../lib/auth';
import { deleteScholarshipBatch, getScholarshipBatchById, updateScholarshipBatch } from '../../../../lib/scholarships';
import { scholarshipBatchUpdateSchema } from '../../../../lib/validations/scholarship';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const batch = await getScholarshipBatchById(id);

    if (!batch) {
      return NextResponse.json({ error: 'Scholarship batch not found' }, { status: 404 });
    }

    if (batch.status !== 'published') {
      const session = await getSession().catch(() => null);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    return NextResponse.json(batch);
  } catch (error) {
    console.error('GET /api/scholarships/[id] error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = scholarshipBatchUpdateSchema.parse(body);
    const updated = await updateScholarshipBatch(id, validatedData);

    if (!updated) {
      return NextResponse.json({ error: 'Scholarship batch not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(e => ({ path: e.path, message: e.message })),
      }, { status: 400 });
    }
    console.error('PATCH /api/scholarships/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update scholarship batch' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession().catch(() => null);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteScholarshipBatch(id);

    if (!success) {
      return NextResponse.json({ error: 'Scholarship batch not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Scholarship batch deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/scholarships/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete scholarship batch' }, { status: 500 });
  }
}
