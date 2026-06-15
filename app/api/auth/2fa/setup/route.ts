import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { z } from 'zod';
import { getSession } from '../../../../../lib/auth';
import dbConnect from '../../../../../lib/db';
import { rateLimit } from '../../../../../lib/rate-limit';
import {
  createTwoFactorEnrollment,
  encryptTwoFactorSecret,
} from '../../../../../lib/two-factor';
import Admin from '../../../../../models/Admin';

const setupSchema = z.object({
  password: z.string().min(1).max(200),
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
      `two-factor-setup-${session.admin.id}-${ip}`,
      5,
      15 * 60 * 1000,
    );
    if (!success) {
      return NextResponse.json(
        { error: 'Too many setup attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const parsed = setupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Enter your current password.' },
        { status: 400 },
      );
    }

    await dbConnect();
    const admin = await Admin.findById(session.admin.id);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (admin.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is already enabled.' },
        { status: 409 },
      );
    }

    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      admin.password,
    );
    if (!passwordMatches) {
      return NextResponse.json(
        { error: 'Current password is invalid.' },
        { status: 401 },
      );
    }

    const enrollment = createTwoFactorEnrollment(admin.email);
    admin.twoFactorPendingSecret = encryptTwoFactorSecret(enrollment.secret);
    await admin.save();

    const qrCodeDataUrl = await QRCode.toDataURL(enrollment.uri, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 240,
    });

    return NextResponse.json({
      qrCodeDataUrl,
      secret: enrollment.secret,
    });
  } catch (error) {
    console.error('Two-factor setup error:', error);
    return NextResponse.json(
      { error: 'Unable to start two-factor setup.' },
      { status: 500 },
    );
  }
}
