import { NextResponse } from 'next/server';
import { filterNews, createNews } from '../../../lib/news';
import { newsSchema } from '../../../lib/validations/news';
import { ZodError } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';
import { getSession } from '../../../lib/auth';

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 'P2002';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';

  try {
    const news = await filterNews(category, search);
    return NextResponse.json(news);
  } catch (error) {
    console.error('GET /api/news error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`news-create-${ip}`, 10, 60 * 1000);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let session;
  try {
    session = await getSession();
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = newsSchema.parse(body);

    const newItem = await createNews(validatedData);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(e => ({ path: e.path, message: e.message }))
      }, { status: 400 });
    }
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: 'An article with this title already exists. Try a slightly different title.' }, { status: 409 });
    }
    console.error('POST /api/news error:', error);
    return NextResponse.json({ error: 'Failed to create news item' }, { status: 500 });
  }
}
