import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    env: {
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      nodeEnv: process.env.NODE_ENV,
    },
    headers: Object.fromEntries(request.headers),
  });
}
