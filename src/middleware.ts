import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt';
import * as appConfig from "@/config";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  const protectedRoutes = appConfig.default.auth.protectedRoutes || ['/dashboard', '/profile'];
  const authRoutes = appConfig.default.auth.authRoutes || ['/auth/signin', '/auth/signup', '/auth/verify-request'];

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Helper function to create full URLs
  const createUrl = (path: string) => new URL(path, appConfig.default.domainUrl);

  if (!isAuthenticated && isProtectedRoute) {
    // Redirect to login if not authenticated and trying to access a protected route
    const signinUrl = createUrl('/auth/signin');
    signinUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signinUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    // Redirect to dashboard if authenticated and trying to access auth page
    return NextResponse.redirect(createUrl('/dashboard'));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    ...appConfig.default.auth.protectedRoutes.map(route => `${route}/:path*`),
    ...appConfig.default.auth.authRoutes.map(route => `${route}/:path*`),
  ],
};