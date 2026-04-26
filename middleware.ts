import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

// Add paths that require authentication
const protectedRoutes = ['/admin'];
const protectedApiRoutes = [
  { path: '/api/courses', methods: ['POST', 'PUT', 'DELETE'] },
  { path: '/api/news', methods: ['POST', 'PUT', 'DELETE'] },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Check Protected Pages
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // 2. Check Protected API Routes
  const isProtectedApiRoute = protectedApiRoutes.some(route => 
    pathname.startsWith(route.path) && route.methods.includes(method)
  );

  if (isProtectedRoute || isProtectedApiRoute) {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (public api routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/admin/:path*',
    '/api/courses/:path*',
    '/api/news/:path*',
  ],
};
