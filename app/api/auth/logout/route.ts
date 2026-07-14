import { NextResponse } from 'next/server';
import { logout } from '../../../../lib/auth';

export async function POST() {
  await logout();
  return new NextResponse(null, { status: 303, headers: { Location: '/login' } });
}
