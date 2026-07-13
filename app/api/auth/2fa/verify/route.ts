import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../../lib/db';
import {
  clearTwoFactorChallenge,
  getTwoFactorChallenge,
  login,
} from '../../../../../lib/auth';
import { rateLimit } from '../../../../../lib/rate-limit';
import { consumeSecondFactor } from '../../../../../lib/two-factor';

const verifySchema = z.object({
  code: z.string().trim().min(6).max(32),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'anonymous';
  const { success } = await rateLimit(
    `two-factor-attempt-${ip}`,
    10,
    15 * 60 * 1000,
  );

  if (!success) {
    return NextResponse.json(
      { error: 'Too many verification attempts. Please try again later.' },
      { status: 429 },
    );
  }

  try {
    const parsed = verifySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Enter a valid authenticator or recovery code.' },
        { status: 400 },
      );
    }

    const challenge = await getTwoFactorChallenge();
    if (!challenge) {
      return NextResponse.json(
        { error: 'Your login challenge expired. Sign in again.' },
        { status: 401 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: challenge.adminId },
    });

    if (!admin?.twoFactorEnabled) {
      await clearTwoFactorChallenge();
      return NextResponse.json(
        { error: 'Two-factor authentication is not available.' },
        { status: 401 },
      );
    }

    const verified = await consumeSecondFactor(
      {
        _id: admin.id,
        twoFactorSecret: admin.twoFactorSecret,
        twoFactorRecoveryCodes: admin.twoFactorRecoveryCodes,
        twoFactorLastUsedCounter: admin.twoFactorLastUsedCounter,
      },
      parsed.data.code,
    );
    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid or already-used verification code.' },
        { status: 401 },
      );
    }

    await login({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    return NextResponse.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Two-factor verification error:', error);
    return NextResponse.json(
      { error: 'Unable to verify two-factor authentication.' },
      { status: 500 },
    );
  }
}
