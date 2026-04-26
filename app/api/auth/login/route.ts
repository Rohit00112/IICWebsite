import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import { login } from '../../../../lib/auth';
import { rateLimit } from '../../../../lib/rate-limit';

export async function POST(request: Request) {
  // Brute force protection (5 attempts per 15 minutes per IP)
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(`login-attempt-${ip}`, 5, 15 * 60 * 1000);

  if (!success) {
    return NextResponse.json({
      error: 'Too many login attempts. Please try again after 15 minutes.'
    }, { status: 429 });
  }

  try {
    await dbConnect();
    const { email, password } = await request.json();
    const cleanEmail = String(email);

    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    await login({ id: admin._id, email: admin.email, name: admin.name });

    return NextResponse.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
