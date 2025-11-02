import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(request) {
  try {
    // Get request body
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: 'If your email is registered, you will receive password reset instructions' },
        { status: 200 }
      );
    }

    // Generate reset token using Web Crypto API (compatible with Edge Runtime)
    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const resetToken = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // In a real application, you would send an email here with a link containing the token
    // For this example, we'll just return a success message
    // The link would be something like: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`
    
    console.log(`Reset token for ${email}: ${resetToken}`);
    console.log(`Reset link would be: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`);

    return NextResponse.json(
      { message: 'If your email is registered, you will receive password reset instructions' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}