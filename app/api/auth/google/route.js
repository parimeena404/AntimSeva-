import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

// JWT secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'antim-seva-secret-key';

// GET method - redirect to Google OAuth
export async function GET(request) {
  try {
    // In a real implementation, you would redirect to Google OAuth
    // For now, we'll redirect to login page with Google login option
    return NextResponse.redirect(new URL('/login?provider=google', request.url));
  } catch (error) {
    console.error('Google OAuth redirect error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function POST(request) {
  try {
    // Get request body
    const { token, userData } = await request.json();
    
    if (!token || !userData) {
      return NextResponse.json(
        { error: 'Google authentication data is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if user exists
    let user = await User.findOne({ email: userData.email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        name: userData.name,
        email: userData.email,
        // Set a random password for Google users
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        googleId: userData.googleId,
        profileImage: userData.profileImage || '',
      });
    } 
    // If user exists but doesn't have googleId, update it
    else if (!user.googleId) {
      user.googleId = userData.googleId;
      user.profileImage = userData.profileImage || user.profileImage;
      await user.save();
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const response = NextResponse.json(
      { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || '',
          profileImage: user.profileImage || '',
        },
        message: 'Login successful' 
      },
      { status: 200 }
    );

    // Set cookie with token
    response.cookies.set({
      name: 'token',
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set user cookie for middleware access
    response.cookies.set({
      name: 'user',
      value: JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || '',
      }),
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    );
  }
}