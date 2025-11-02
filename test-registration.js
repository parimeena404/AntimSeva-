// Simple MongoDB connection test
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://tiwarianurag342407:asdfghjkl123A@antim-seva.jfmmpb3.mongodb.net/?retryWrites=true&w=majority&appName=Antim-Seva";

async function testConnection() {
  console.log('🔄 Testing MongoDB connection for registration...');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  });
  
  try {
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('antimseva');
    console.log('📂 Connected to database: antimseva');
    
    // Test inserting a sample user
    const usersCollection = db.collection('users');
    console.log('👥 Accessing users collection');
    
    const testUser = {
      name: "Test User",
      email: `test_${Date.now()}@example.com`,
      password: "hashedpassword",
      phone: "+1234567890",
      address: "Test Address",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(testUser);
    console.log('✅ Test user inserted with ID:', result.insertedId);
    
    // Count users
    const count = await usersCollection.countDocuments();
    console.log('📊 Total users in collection:', count);
    
    // Clean up test user
    await usersCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test user cleaned up');
    
    console.log('🎉 Registration should work now!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
  } finally {
    await client.close();
  }
}

testConnection();
