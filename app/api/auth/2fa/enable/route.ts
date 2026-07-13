import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '../../../../../lib/auth';
import prisma from '../../../../../lib/db';
import { rateLimit } from '../../../../../lib/rate-limit';
import {
  decryptTwoFactorSecret,
  generateRecoveryCodes,
  hashRecoveryCodes,
  verifyTotp,
} from '../../../../../lib/two-factor';

const enableSchema = z.object({
  code: z.string().trim().regex(/^\d{6}$/),
});

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'anonymous';
    const { success } = await rateLimit(
      `two-factor-enable-${session.admin.id}-${ip}`,
      10,
      15 * 60 * 1000,
    );
    if (!success) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const parsed = enableSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Enter the six-digit code from your authenticator app.' },
        { status: 400 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.admin.id },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (admin.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is already enabled.' },
        { status: 409 },
      );
    }

    if (!admin.twoFactorPendingSecret) {
      return NextResponse.json(
        { error: 'Start two-factor setup before confirming a code.' },
        { status: 409 },
      );
    }

    const secret = decryptTwoFactorSecret(admin.twoFactorPendingSecret);
    if (verifyTotp(secret, parsed.data.code) === null) {
      return NextResponse.json(
        { error: 'That authenticator code is invalid.' },
        { status: 401 },
      );
    }

    const recoveryCodes = generateRecoveryCodes();
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: admin.twoFactorPendingSecret,
        twoFactorPendingSecret: null,
        twoFactorRecoveryCodes: hashRecoveryCodes(recoveryCodes),
        twoFactorLastUsedCounter: -1,
      },
    });

    return NextResponse.json({
      message: 'Two-factor authentication enabled.',
      recoveryCodes,
    });
  } catch (error) {
    console.error('Two-factor enable error:', error);
    return NextResponse.json(
      { error: 'Unable to enable two-factor authentication.' },
      { status: 500 },
    );
  }
}
