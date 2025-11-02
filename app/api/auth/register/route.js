import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb-native';

export async function POST(request) {
  try {
    console.log('🔄 Registration attempt started...');
    
    const { name, email, password, phone, address } = await request.json();
    console.log('📝 Registration data received:', { name, email, phone: phone ? 'provided' : 'not provided' });

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    console.log('🔍 Attempting database connection...');
    // Connect to database using native driver
    const { db } = await connectToDatabase();
    console.log('✅ Database connection successful');

    // Check if user already exists in users collection
    const usersCollection = db.collection('users');
    console.log('🔍 Checking for existing user...');
    const existingUser = await usersCollection.findOne({ email });
    
    if (existingUser) {
      console.log('⚠️ User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    console.log('🔒 Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('👤 Creating new user...');
    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('💾 Inserting user into database...');
    const result = await usersCollection.insertOne(newUser);
    console.log('✅ User inserted with ID:', result.insertedId);

    // Return user without password
    const userResponse = {
      _id: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    };

    console.log('✅ User registered successfully in users collection:', userResponse.email);

    return NextResponse.json({ 
      message: 'User registered successfully',
      user: userResponse 
    }, { status: 201 });
  } catch (error) {
    console.error('❌ Registration error details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Return more specific error message
    let errorMessage = 'Failed to register user';
    if (error.message.includes('MONGODB_URI')) {
      errorMessage = 'Database configuration error';
    } else if (error.message.includes('connect')) {
      errorMessage = 'Database connection error';
    } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      errorMessage = 'Database operation error: ' + error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}