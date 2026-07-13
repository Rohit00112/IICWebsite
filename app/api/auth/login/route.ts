import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/db';
import {
  clearTwoFactorChallenge,
  createTwoFactorChallenge,
  login,
} from '../../../../lib/auth';
import { rateLimit } from '../../../../lib/rate-limit';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'anonymous';
  const { success } = await rateLimit(`login-attempt-${ip}`, 5, 15 * 60 * 1000);

  if (!success) {
    return NextResponse.json({
      error: 'Too many login attempts. Please try again after 15 minutes.'
    }, { status: 429 });
  }

  try {
    await clearTwoFactorChallenge();
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { email, password } = parsed.data;
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (admin.twoFactorEnabled) {
      if (!admin.twoFactorSecret) {
        console.error('Two-factor authentication is enabled without a secret');
        return NextResponse.json(
          { error: 'Two-factor authentication is unavailable' },
          { status: 500 },
        );
      }

      await createTwoFactorChallenge(admin.id);
      return NextResponse.json({ requiresTwoFactor: true });
    }

    await login({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    return NextResponse.json({
      message: 'Logged in successfully',
      requiresTwoFactor: false,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
