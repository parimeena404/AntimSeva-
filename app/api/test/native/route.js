import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';

export async function GET() {
  try {
    console.log('Testing MongoDB Atlas connection with native driver...');
    
    const { client, db } = await connectToDatabase();
    
    // Test by counting documents in various collections
    const collections = await db.listCollections().toArray();
    const stats = {};
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      stats[collection.name] = count;
    }
    
    const response = { 
      success: true,
      message: 'MongoDB Atlas connected successfully with native driver!',
      timestamp: new Date().toISOString(),
      database: db.databaseName,
      collections: collections.map(c => c.name),
      stats
    };
    
    console.log('✅ Native driver test successful:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Native driver test failed:', error);
    
    const errorResponse = { 
      success: false,
      error: error.message,
      type: error.constructor.name,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
