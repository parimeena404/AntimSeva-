import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Cart from '@/models/Cart';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    await dbConnect();
    
    // Test connection by counting users
    const userCount = await User.countDocuments();
    const cartCount = await Cart.countDocuments();
    
    const response = { 
      success: true,
      message: 'MongoDB Atlas connected successfully!',
      timestamp: new Date().toISOString(),
      stats: {
        users: userCount,
        carts: cartCount
      }
    };
    
    console.log('✅ Database test successful:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    
    const errorResponse = { 
      success: false,
      error: error.message,
      type: error.constructor.name,
      timestamp: new Date().toISOString(),
      details: error.reason ? error.reason.type : 'Unknown error'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
