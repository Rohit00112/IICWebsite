import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getSession } from '@/lib/auth';
import { deleteEventGallery, getEventGalleryById, updateEventGallery } from '@/lib/event-galleries';
import { eventGalleryUpdateSchema } from '@/lib/validations/event-gallery';

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 11000;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gallery = await getEventGalleryById(id);
  return gallery ? NextResponse.json(gallery) : NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const gallery = await updateEventGallery(id, eventGalleryUpdateSchema.parse(await request.json()));
    return gallery ? NextResponse.json(gallery) : NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: 'A gallery with this page slug already exists.' }, { status: 409 });
    }
    console.error('PATCH /api/galleries/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession().catch(() => null);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteEventGallery(id);
  return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
}
