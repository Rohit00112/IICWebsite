import { NextResponse } from 'next/server';
import { getAllNews, filterNews, createNews } from '../../../lib/news';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';

  try {
    const news = await filterNews(category, search);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newItem = await createNews(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news item' }, { status: 500 });
  }
}
