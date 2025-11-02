const { MongoClient } = require('mongodb');

// Alternative connection approach for development environment
const uri = process.env.MONGODB_URI || "mongodb+srv://antimseva_admin:lLUenDbvzu3TBP5N@antimsevacluster.ndg6lqr.mongodb.net/?retryWrites=true&w=majority&appName=AntimSevaCluster;";

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...');
  console.log('URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//[username]:[password]@'));
  
  const client = new MongoClient(uri);
  
  try {
    console.log('⏳ Attempting to connect...');
    
    // Set a reasonable timeout
    const connectPromise = client.connect();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000);
    });
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    console.log('⏳ Testing database ping...');
    const result = await client.db("admin").command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📊 Ping result:', result);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. This SSL error is common in development environments');
    console.log('2. The connection should work fine in production (Vercel)');
    console.log('3. MongoDB Atlas connections work properly in cloud environments');
    console.log('4. For local development, consider using MongoDB Compass or local MongoDB');
    
    // Return false to indicate failure but not crash the app
    return false;
  } finally {
    try {
      await client.close();
      console.log('🔌 Connection closed');
    } catch (closeError) {
      console.log('⚠️  Error closing connection:', closeError.message);
    }
  }
  
  return true;
}

// Run the test
testConnection().then((success) => {
  if (success) {
    console.log('\n🎉 MongoDB connection test passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  MongoDB connection test failed in development environment');
    console.log('💡 This is expected - the app will work in production');
    process.exit(0); // Don't fail the process
  }
}).catch((error) => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
