import { NextResponse } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '../../../../lib/news';

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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updatedItem = await updateNews(id, data);
    
    if (!updatedItem) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
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
    return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
  }
}
