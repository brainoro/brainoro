import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public, static, auth, and billing assets through without restriction
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/start') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/onboarding') ||
    pathname.includes('.') // static files like favicon.ico, images, logos
  ) {
    return NextResponse.next();
  }

  // 2. Check for trial status cookie if present (set on auth hydration)
  const trialExpiredCookie = request.cookies.get('brainoro_trial_expired')?.value;
  if (trialExpiredCookie === 'true') {
    const billingUrl = new URL('/billing', request.url);
    return NextResponse.redirect(billingUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, fonts
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)',
  ],
};
