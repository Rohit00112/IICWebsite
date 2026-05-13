import { NextResponse } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '../../../../lib/news';
import { newsSchema } from '../../../../lib/validations/news';
import { ZodError } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getNewsById(id);
    if (!item) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/news/[id] error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate partial update with Zod
    const validatedData = newsSchema.partial().parse(body);
    
    const updatedItem = await updateNews(id, validatedData);
    
    if (!updatedItem) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(e => ({ path: e.path, message: e.message }))
      }, { status: 400 });
    }
    console.error('PATCH /api/news/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update news item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteNews(id);
    
    if (!success) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/news/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
  }
}
