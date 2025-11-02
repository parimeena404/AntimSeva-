import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import CartSession from '@/models/CartSession';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth/next';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'antim-seva-secret-key';

// Helper function to get user identification
async function getUserIdentification(request) {
  // Try token from cookies
  const cookies = request.cookies;
  const token = cookies.get('token')?.value;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return {
        userId: decoded.userId || decoded.id,
        userEmail: decoded.email,
        authenticated: true
      };
    } catch (tokenError) {
      console.error('Token verification error:', tokenError);
    }
  }
  
  // Try NextAuth session
  try {
    const { authOptions } = await import('@/app/api/auth/[...nextauth]/options');
    const session = await getServerSession(authOptions);
    
    if (session) {
      return {
        userId: session.user.id,
        userEmail: session.user.email,
        authenticated: true
      };
    }
  } catch (sessionError) {
    console.error('Session error:', sessionError);
  }
  
  // Try session ID from headers/body for guest users
  const sessionId = request.headers.get('x-session-id') || null;
  
  return {
    userId: null,
    userEmail: null,
    sessionId: sessionId,
    authenticated: false
  };
}

// GET - Fetch user's cart
export async function GET(request) {
  try {
    const userInfo = await getUserIdentification(request);
    
    if (!userInfo.userEmail && !userInfo.sessionId) {
      return NextResponse.json({ 
        success: true,
        cart: { items: [], lastUpdated: null }
      });
    }
    
    await dbConnect();
    
    let cart = null;
    
    if (userInfo.userEmail) {
      // Get cart by email (for authenticated users)
      cart = await CartSession.findOne({ 
        userEmail: userInfo.userEmail 
      }).sort({ lastUpdated: -1 });
    } else if (userInfo.sessionId) {
      // Get cart by session ID (for guest users)
      cart = await CartSession.findOne({ 
        sessionId: userInfo.sessionId 
      }).sort({ lastUpdated: -1 });
    }
    
    return NextResponse.json({ 
      success: true,
      cart: cart || { items: [], lastUpdated: null }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Save/Update user's cart
export async function POST(request) {
  try {
    const body = await request.json();
    const { items, sessionId } = body;
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }
    
    const userInfo = await getUserIdentification(request);
    const guestSessionId = sessionId || userInfo.sessionId || uuidv4();
    
    await dbConnect();
    
    let cartData = {
      items: items,
      lastUpdated: new Date()
    };
    
    if (userInfo.userEmail) {
      // For authenticated users, save by email
      cartData.userEmail = userInfo.userEmail;
      if (userInfo.userId) {
        cartData.userId = userInfo.userId;
      }
      
      // Update or create cart for authenticated user
      const cart = await CartSession.findOneAndUpdate(
        { userEmail: userInfo.userEmail },
        cartData,
        { 
          upsert: true, 
          new: true,
          setDefaultsOnInsert: true
        }
      );
      
      return NextResponse.json({ 
        success: true,
        cart: cart,
        message: 'Cart saved successfully'
      });
    } else {
      // For guest users, save by session ID
      cartData.sessionId = guestSessionId;
      cartData.userEmail = `guest-${guestSessionId}@temp.local`; // Temporary email for guests
      
      const cart = await CartSession.findOneAndUpdate(
        { sessionId: guestSessionId },
        cartData,
        { 
          upsert: true, 
          new: true,
          setDefaultsOnInsert: true
        }
      );
      
      return NextResponse.json({ 
        success: true,
        cart: cart,
        sessionId: guestSessionId,
        message: 'Cart saved successfully'
      });
    }
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json(
      { error: 'Failed to save cart', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Migrate guest cart to authenticated user
export async function PUT(request) {
  try {
    const body = await request.json();
    const { sessionId } = body;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required for cart migration' },
        { status: 400 }
      );
    }
    
    const userInfo = await getUserIdentification(request);
    
    if (!userInfo.authenticated || !userInfo.userEmail) {
      return NextResponse.json(
        { error: 'User must be authenticated for cart migration' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Find guest cart
    const guestCart = await CartSession.findOne({ sessionId: sessionId });
    
    if (!guestCart || guestCart.items.length === 0) {
      return NextResponse.json({ 
        success: true,
        message: 'No guest cart found to migrate'
      });
    }
    
    // Find existing authenticated user cart
    const userCart = await CartSession.findOne({ userEmail: userInfo.userEmail });
    
    let mergedItems = guestCart.items;
    
    if (userCart && userCart.items.length > 0) {
      // Merge carts - combine items with same ID
      const existingItemsMap = new Map();
      userCart.items.forEach(item => {
        existingItemsMap.set(item.id, item);
      });
      
      guestCart.items.forEach(guestItem => {
        if (existingItemsMap.has(guestItem.id)) {
          // Add quantities for existing items
          const existingItem = existingItemsMap.get(guestItem.id);
          existingItem.quantity += guestItem.quantity;
        } else {
          // Add new items
          existingItemsMap.set(guestItem.id, guestItem);
        }
      });
      
      mergedItems = Array.from(existingItemsMap.values());
    }
    
    // Update authenticated user's cart
    const updatedCart = await CartSession.findOneAndUpdate(
      { userEmail: userInfo.userEmail },
      {
        userEmail: userInfo.userEmail,
        userId: userInfo.userId,
        items: mergedItems,
        lastUpdated: new Date()
      },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true
      }
    );
    
    // Delete guest cart
    await CartSession.deleteOne({ sessionId: sessionId });
    
    return NextResponse.json({ 
      success: true,
      cart: updatedCart,
      message: 'Cart migrated successfully'
    });
  } catch (error) {
    console.error('Error migrating cart:', error);
    return NextResponse.json(
      { error: 'Failed to migrate cart', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Clear user's cart
export async function DELETE(request) {
  try {
    const userInfo = await getUserIdentification(request);
    
    if (!userInfo.userEmail && !userInfo.sessionId) {
      return NextResponse.json({ 
        success: true,
        message: 'No cart to clear'
      });
    }
    
    await dbConnect();
    
    if (userInfo.userEmail) {
      // Clear cart for authenticated user
      await CartSession.deleteOne({ userEmail: userInfo.userEmail });
    } else if (userInfo.sessionId) {
      // Clear cart for guest user
      await CartSession.deleteOne({ sessionId: userInfo.sessionId });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart', details: error.message },
      { status: 500 }
    );
  }
}
