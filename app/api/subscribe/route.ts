import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Subscriber from '../../../models/Subscriber';
import { rateLimit } from '../../../lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`subscribe-${ip}`, 5, 60 * 1000);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 }
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
        return NextResponse.json({ message: 'Subscription reactivated.' });
      }
      return NextResponse.json(
        { message: 'You are already subscribed.' },
        { status: 200 }
      );
    }
    await Subscriber.create({ email, source: body.source || 'news-sidebar' });
    return NextResponse.json({ message: 'Subscribed successfully.' }, { status: 201 });
  } catch (err) {
    console.error('[subscribe] failed', err);
    return NextResponse.json(
      { error: 'Could not subscribe right now. Please try again.' },
      { status: 500 }
    );
  }
}
