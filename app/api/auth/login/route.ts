import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import { login } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    const admin = await Admin.findOne({ email });

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
