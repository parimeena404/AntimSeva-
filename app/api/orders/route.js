import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth/next';

// JWT secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'antim-seva-secret-key';

// GET - Fetch user's orders
export async function GET(request) {
  try {
    // Try to get token from cookies
    const cookies = request.cookies;
    const token = cookies.get('token')?.value;
    let userEmail = null;
    let userId = null;
    
    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.userId || decoded.id;
        userEmail = decoded.email;
        
        await dbConnect();
        
        // Get user's orders by both userId and email for comprehensive history
        const orders = await Order.find({ 
          $or: [
            { userId: userId },
            { 'customerInfo.email': userEmail }
          ]
        }).sort({ timestamp: -1 });
        
        return NextResponse.json({ 
          success: true,
          orders,
          count: orders.length
        });
      } catch (tokenError) {
        console.error('Token verification error:', tokenError);
        // Continue to try NextAuth session if token verification fails
      }
    }
    
    // Fallback to NextAuth session if available
    try {
      // Import dynamically to prevent build errors
      const { authOptions } = await import('@/app/api/auth/[...nextauth]/options');
      const session = await getServerSession(authOptions);
      
      if (session) {
        await dbConnect();
        
        // Get user's orders by both userId and email
        const orders = await Order.find({ 
          $or: [
            { userId: session.user.id },
            { 'customerInfo.email': session.user.email }
          ]
        }).sort({ timestamp: -1 });
        
        return NextResponse.json({ 
          success: true,
          orders,
          count: orders.length
        });
      }
    } catch (sessionError) {
      console.error('Session error:', sessionError);
      // Continue to check for guest orders if session check fails
    }
    
    // For guest users, check if orderIds are provided in the request body for POST requests with orderIds
    const url = new URL(request.url);
    const guestOrderIds = url.searchParams.get('orderIds');
    
    if (guestOrderIds) {
      try {
        const orderIdArray = JSON.parse(guestOrderIds);
        await dbConnect();
        
        const orders = await Order.find({ 
          orderId: { $in: orderIdArray }
        }).sort({ timestamp: -1 });
        
        return NextResponse.json({ 
          success: true,
          orders,
          count: orders.length
        });
      } catch (parseError) {
        console.error('Error parsing guest order IDs:', parseError);
      }
    }
    
    // If no authentication method worked and no guest orders
    return NextResponse.json({ 
      success: true,
      orders: [],
      count: 0,
      message: 'No orders found. Please log in to view your order history.'
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new order or fetch orders by IDs
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if this is a request to fetch orders by IDs (for guest users)
    if (body.orderIds && Array.isArray(body.orderIds)) {
      await dbConnect();
      
      const orders = await Order.find({ 
        orderId: { $in: body.orderIds }
      }).sort({ timestamp: -1 });
      
      return NextResponse.json({ 
        success: true,
        orders,
        count: orders.length
      });
    }
    
    // Otherwise, this is a request to create a new order
    const orderData = body;
    
    // Try to get token from cookies
    const cookies = request.cookies;
    const token = cookies.get('token')?.value;
    
    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId || decoded.id;
        
        // Add userId from token
        orderData.userId = userId;
        
        await dbConnect();
        
        // Create new order
        const order = new Order(orderData);
        await order.save();
        
        return NextResponse.json({ 
          success: true, 
          order,
          message: 'Order created successfully' 
        });
      } catch (tokenError) {
        console.error('Token verification error:', tokenError);
        // Continue to try NextAuth session if token verification fails
      }
    }
    
    // Fallback to NextAuth session if available
    try {
      // Import dynamically to prevent build errors
      const { authOptions } = await import('@/app/api/auth/[...nextauth]/options');
      const session = await getServerSession(authOptions);
      
      if (session) {
        // Add userId from session
        orderData.userId = session.user.id;
        
        await dbConnect();
        
        // Create new order
        const order = new Order(orderData);
        await order.save();
        
        return NextResponse.json({ 
          success: true, 
          order,
          message: 'Order created successfully' 
        });
      }
    } catch (sessionError) {
      console.error('Session error:', sessionError);
      // Continue to create order without authentication for guest users
    }
    
    // For guest users, create order without userId (but still require email in customerInfo)
    if (!orderData.customerInfo?.email) {
      return NextResponse.json({ 
        error: 'Customer email is required' 
      }, { status: 400 });
    }
    
    await dbConnect();
    
    // Create new order for guest user
    const order = new Order(orderData);
    await order.save();
    
    return NextResponse.json({ 
      success: true, 
      order,
      message: 'Order created successfully' 
    });
  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}