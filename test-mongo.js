const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

const uri = process.env.MONGODB_URI || "mongodb+srv://tiwarianurag342407:asdfghjkl123A@antim-seva.jfmmpb3.mongodb.net/?retryWrites=true&w=majority&appName=Antim-Seva;" // Replace with your string

// Try with minimal configuration first
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  // Try without any SSL/TLS specific settings
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    await client.close();
  }
}
run();
