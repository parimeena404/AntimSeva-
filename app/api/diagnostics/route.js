import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      runtime: 'Node.js',
      
      // Environment variables check
      envVars: {
        MONGODB_URI: !!process.env.MONGODB_URI,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'not set',
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        STRIPE_PUBLISHABLE_KEY: !!process.env.STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
        RAZORPAY_KEY_ID: !!process.env.RAZORPAY_KEY_ID,
        RAZORPAY_SECRET: !!process.env.RAZORPAY_SECRET,
      },
      
      // System info
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
      }
    };

    // Test MongoDB connection
    try {
      const dbConnect = (await import('@/lib/mongoose')).default;
      await dbConnect();
      diagnostics.mongodb = {
        status: 'connected',
        message: 'MongoDB connection successful'
      };
    } catch (error) {
      diagnostics.mongodb = {
        status: 'error',
        message: error.message,
        stack: error.stack
      };
    }

    // Test crypto functionality
    try {
      const tokenArray = new Uint8Array(8);
      crypto.getRandomValues(tokenArray);
      const testToken = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');
      diagnostics.crypto = {
        status: 'working',
        testToken: testToken
      };
    } catch (error) {
      diagnostics.crypto = {
        status: 'error',
        message: error.message
      };
    }

    console.log('🔍 Deployment diagnostics:', JSON.stringify(diagnostics, null, 2));

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error) {
    console.error('❌ Diagnostics error:', error);
    
    return NextResponse.json({
      error: 'Diagnostic failed',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
