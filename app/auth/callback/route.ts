/**
 * Auth callback route
 * Handles OAuth redirects from Supabase (if OAuth is enabled in the future)
 * Not needed for email/password authentication
 */

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page or the next parameter
  return NextResponse.redirect(new URL(next, request.url));
}
