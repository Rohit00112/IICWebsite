import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '../../../../lib/auth';
import dbConnect from '../../../../lib/db';
import { rateLimit } from '../../../../lib/rate-limit';
import { consumeSecondFactor } from '../../../../lib/two-factor';
import Admin from '../../../../models/Admin';

const disableSchema = z.object({
  password: z.string().min(1).max(200),
  code: z.string().trim().min(6).max(32),
});

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'anonymous';
    const { success } = await rateLimit(
      `two-factor-disable-${session.admin.id}-${ip}`,
      5,
      15 * 60 * 1000,
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const parsed = disableSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Password and verification code are required.' },
        { status: 400 },
      );
    }

    await dbConnect();
    const admin = await Admin.findById(session.admin.id).select(
      '+twoFactorSecret +twoFactorRecoveryCodes +twoFactorLastUsedCounter',
    );

    if (!admin?.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not enabled.' },
        { status: 409 },
      );
    }

    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      admin.password,
    );
    if (!passwordMatches) {
      return NextResponse.json(
        { error: 'Password or verification code is invalid.' },
        { status: 401 },
      );
    }

    const verified = await consumeSecondFactor(admin, parsed.data.code);
    if (!verified) {
      return NextResponse.json(
        { error: 'Password or verification code is invalid.' },
        { status: 401 },
      );
    }

    await Admin.updateOne(
      { _id: admin._id },
      {
        $set: {
          twoFactorEnabled: false,
          twoFactorLastUsedCounter: -1,
          twoFactorRecoveryCodes: [],
        },
        $unset: {
          twoFactorSecret: '',
          twoFactorPendingSecret: '',
        },
      },
    );

    return NextResponse.json({
      message: 'Two-factor authentication disabled.',
    });
  } catch (error) {
    console.error('Two-factor disable error:', error);
    return NextResponse.json(
      { error: 'Unable to disable two-factor authentication.' },
      { status: 500 },
    );
  }
}
