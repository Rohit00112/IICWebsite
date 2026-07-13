import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';
import { createEventGallery, getPublishedEventGalleries } from '@/lib/event-galleries';
import { eventGallerySchema } from '@/lib/validations/event-gallery';

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 'P2002';
}

export async function GET() {
  try {
    return NextResponse.json(await getPublishedEventGalleries());
  } catch (error) {
    console.error('GET /api/galleries error:', error);
    return NextResponse.json({ error: 'Failed to load galleries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const gallery = await createEventGallery(eventGallerySchema.parse(await request.json()));
    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: 'A gallery with this page slug already exists.' }, { status: 409 });
    }
    console.error('POST /api/galleries error:', error);
    return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
  }
}
