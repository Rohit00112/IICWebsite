import { NextResponse } from 'next/server';
import { getAllCourses, createCourse } from '../../../lib/courses';
import { courseSchema } from '../../../lib/validations/course';
import { ZodError } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';

export async function GET() {
  try {
    const courses = await getAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Rate limiting (10 requests per minute per IP)
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`course-create-${ip}`, 10, 60 * 1000);
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const data = await request.json();
    
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    // Validate with Zod
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
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
