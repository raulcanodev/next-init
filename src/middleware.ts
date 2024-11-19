import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt';
import * as appConfig from "@/config";

function createUrl(path: string, baseUrl: string): URL {
  return new URL(path, baseUrl);
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const isAuthenticated = !!token;

    // Add here the routes that require authentication
    const protectedRoutes: string[] = ['/dashboard', '/profile'];
    
    // Here the routes that are related to authentication, if you are authenticated you can't access them
    const authRoutes: string[] = ['/auth/signin', '/auth/signup', '/auth/verify-request'];

    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );

    if (!isAuthenticated && isProtectedRoute) {
      const signinUrl = createUrl('/auth/signin', appConfig.default.domainUrl);
      signinUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signinUrl);
    }

    if (isAuthenticated && isAuthRoute) {
      return NextResponse.redirect(createUrl('/dashboard', appConfig.default.domainUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(createUrl('/auth/error', appConfig.default.domainUrl));
  }
}

export const config = {
  
  // Add here the routes that require authentication
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};