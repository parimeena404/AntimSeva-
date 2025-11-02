import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4, // Use IPv4
      // Add Atlas specific options
      retryWrites: true,
      w: 'majority',
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB successfully');
      console.log('Database:', mongoose.connection.name);
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      console.error('Connection string used:', MONGODB_URI.replace(/:[^:@]*@/, ':***@'));
      
      // Enhanced error logging for DNS issues
      if (error.message.includes('No addresses found') || error.message.includes('ENOTFOUND')) {
        console.error('🔍 DNS Resolution Issue: MongoDB Atlas cluster appears to be unreachable');
        console.error('💡 Check: 1) Atlas cluster is running 2) Network access whitelist 3) Connection string');
      }
      
      // Reset promise so it can be retried
      cached.promise = null;
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
export { dbConnect as connectDB };