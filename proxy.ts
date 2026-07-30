import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');

  // Skip proxy for API routes or static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/images')) {
    return NextResponse.next();
  }

  // 1. Handle Login Page
  if (isLoginPage) {
    if (token) {
      // If already logged in, redirect away from login page to dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next(); // Allow unauthenticated users to see login
  }

  // 2. Handle Protected Admin Routes
  if (isAdminRoute) {
    if (!token) {
      // Not logged in, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Allow access to protected route, but add strict cache-control headers
    // This ensures the browser NEVER caches the admin pages.
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
