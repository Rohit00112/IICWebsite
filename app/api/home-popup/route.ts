import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getSession } from '../../../lib/auth';
import { getHomePopupSettings, updateHomePopupSettings } from '../../../lib/home-popup';
import { homePopupSchema } from '../../../lib/validations/home-popup';

export async function GET() {
  const settings = await getHomePopupSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
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
    const validatedData = homePopupSchema.parse(body);
    const settings = await updateHomePopupSettings(
      validatedData,
      session.admin.email,
    );

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      }, { status: 400 });
    }

    console.error('PATCH /api/home-popup error:', error);
    return NextResponse.json({ error: 'Failed to update home popup' }, { status: 500 });
  }
}
