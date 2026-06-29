import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

// Add paths that require authentication
const protectedRoutes = ['/admin'];
const protectedApiRoutes = [
  { path: '/api/courses', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/news', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/scholarships', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/home-popup', methods: ['PATCH'] },
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const session = request.cookies.get('session')?.value;

  // 1. Check Protected Pages
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // 2. Check Protected API Routes
  const isProtectedApiRoute = protectedApiRoutes.some(route => 
    pathname.startsWith(route.path) && route.methods.includes(method)
  );

  // Redirect to admin if already logged in and visiting login page
  if (pathname === '/login' && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL('/admin/news', request.url));
    } catch {
      // Continue to login if session is invalid
    }
  }

  if (isProtectedRoute || isProtectedApiRoute) {
    if (!session) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/courses/:path*',
    '/api/news/:path*',
    '/api/scholarships/:path*',
    '/api/home-popup',
    '/login',
  ],
};
