/**
 * Next.js middleware
 * Handles authentication and session management
 */

import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Update session and get response
  const response = await updateSession(request);

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Allow public access to login and auth callback
  if (pathname.startsWith('/login') || pathname.startsWith('/auth/callback')) {
    return response;
  }

  // For other routes, check authentication
  // The session update will refresh the token if needed
  // We'll handle redirects in the client components if needed

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
