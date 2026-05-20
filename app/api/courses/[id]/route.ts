import { NextResponse } from 'next/server';
import { getCourseById, updateCourse, deleteCourse } from '../../../../lib/courses';
import { getSession } from '../../../../lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getCourseById(id);
    if (!item) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/courses/[id] error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Session check (defense-in-depth)
  let session;
  try {
    session = await getSession();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const updatedItem = await updateCourse(id, data);
    
    if (!updatedItem) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('PATCH /api/courses/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Session check (defense-in-depth)
  let session;
  try {
    session = await getSession();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteCourse(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/courses/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
