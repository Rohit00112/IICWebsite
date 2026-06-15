import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }
  return 'development-only-jwt-secret';
}

const sessionCookieName = 'session';
const twoFactorChallengeCookieName = 'two_factor_challenge';

function getSigningKey() {
  return new TextEncoder().encode(getJwtSecret());
}

export interface SessionAdmin {
  id: string;
  email: string;
  name: string;
}

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(getSigningKey());
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, getSigningKey(), {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(admin: SessionAdmin) {
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ admin, type: 'session' });
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, session, {
    expires, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  cookieStore.delete(twoFactorChallengeCookieName);
}

export async function createTwoFactorChallenge(adminId: string) {
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const challenge = await new SignJWT({
    adminId,
    type: 'two-factor-challenge',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(getSigningKey());

  (await cookies()).set(twoFactorChallengeCookieName, challenge, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
}

export async function getTwoFactorChallenge() {
  const challenge = (await cookies()).get(twoFactorChallengeCookieName)?.value;
  if (!challenge) return null;

  try {
    const { payload } = await jwtVerify(challenge, getSigningKey(), {
      algorithms: ['HS256'],
    });

    if (
      payload.type !== 'two-factor-challenge' ||
      typeof payload.adminId !== 'string'
    ) {
      return null;
    }

    return { adminId: payload.adminId };
  } catch {
    return null;
  }
}

export async function clearTwoFactorChallenge() {
  (await cookies()).delete(twoFactorChallengeCookieName);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  cookieStore.delete(twoFactorChallengeCookieName);
}

export async function getSession() {
  const session = (await cookies()).get(sessionCookieName)?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (payload.type !== 'session' || !payload.admin) {
    return null;
  }

  return payload as {
    admin: SessionAdmin;
    type: 'session';
  };
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(sessionCookieName)?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  if (parsed.type !== 'session') return;

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: sessionCookieName,
    value: await encrypt({
      admin: parsed.admin,
      type: 'session',
    }),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  });
  return res;
}
