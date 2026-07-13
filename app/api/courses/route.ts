import { NextResponse } from 'next/server';
import { getAllCourses, createCourse } from '../../../lib/courses';
import { courseSchema } from '../../../lib/validations/course';
import { ZodError } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';
import { getSession } from '../../../lib/auth';

function isDuplicateKeyError(error: unknown): error is { code: string; meta?: { target?: string | string[] } } {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 'P2002';
}

export async function GET() {
  try {
    const courses = await getAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('GET /api/courses error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`course-create-${ip}`, 10, 60 * 1000);

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
    const data = await request.json();

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const validatedData = courseSchema.parse(data);

    const newItem = await createCourse({ ...validatedData, slug: data.slug });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map(e => ({ path: e.path, message: e.message }))
      }, { status: 400 });
    }
    
    if (isDuplicateKeyError(error)) {
      const target = error.meta?.target;
      const field = typeof target === 'string' ? target : Array.isArray(target) ? target.join(', ') : 'slug';
      return NextResponse.json({ error: `A course with this ${field} already exists.` }, { status: 409 });
    }
    
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
