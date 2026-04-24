import { NextResponse } from 'next/server';
import { getAllCourses, createCourse } from '../../../lib/courses';

export async function GET() {
  try {
    const courses = await getAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const newItem = await createCourse(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
