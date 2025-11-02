import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Admin authorized emails
const AUTHORIZED_ADMINS = [
  'vaibhavmalviyaji@gmail.com',
  'tiwarianurag342407@gmail.com'
];

// Paths that require authentication
const protectedPaths = [
  '/profile',
  '/checkout',
  '/orders',
  '/change-password',
];

// Admin paths that require admin authorization
const adminPaths = [
  '/admin',
];

// Paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;

  // Validate JWT if present using Edge-friendly jose
  let isAuthenticated = false;
  let user = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'antim-seva-secret-key');
      await jwtVerify(token, secret);
      isAuthenticated = true;
      
      // Parse user data if available
      if (userCookie) {
        try {
          user = JSON.parse(userCookie);
        } catch (e) {
          console.log('Invalid user cookie');
        }
      }
    } catch (_err) {
      // Invalid or expired token – treat as unauthenticated
      isAuthenticated = false;
    }
  }

  // Prepare a response we can mutate (e.g., clear bad cookie)
  let response;

  // If token exists but is invalid/expired, clear it proactively
  if (token && !isAuthenticated) {
    response = NextResponse.next();
    response.cookies.set({ name: 'token', value: '', path: '/', maxAge: 0 });
    response.cookies.set({ name: 'user', value: '', path: '/', maxAge: 0 });
  }

  // Check admin access for admin paths
  if (adminPaths.some((adminPath) => path.startsWith(adminPath))) {
    if (!isAuthenticated) {
      // Redirect to Google login for admin access
      return NextResponse.redirect(new URL('/api/auth/google', request.url));
    }
    
    // Check if user is authorized admin - Only Anurag and Vaibhav
    if (!user || !AUTHORIZED_ADMINS.includes(user.email)) {
      // Redirect unauthorized users to home page
      return NextResponse.redirect(new URL('/?error=unauthorized-admin', request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((authPath) => path.startsWith(authPath))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response ?? NextResponse.next();
}

// No matcher config - let Next.js handle all routes
export const config = {
  matcher: [
    /*
     * Match specific paths that need auth protection or redirection:
     */
    '/profile',
    '/checkout',
    '/orders',
    '/change-password',
    '/admin/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ],
};