// In middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const protectedPaths = ['/dashboard/page', '/dashboard/settings', '/dashboard/style'];
  const authPaths = ['/auth/signin', '/auth/signup', '/auth/verify-request'];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isAuthRoute = authPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect to dashboard if authenticated and trying to access auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard/page', req.url));
  }

  // Redirect to signin if not authenticated and trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};