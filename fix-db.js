// Run this script once to fix the existing database
// Usage: node fix-db.js

import { MongoClient } from "mongodb";
import "dotenv/config";

async function fixDatabase() {
  const url = process.env.MONGO_URL;
  if (!url) {
    console.error("MONGO_URL not set in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(url);
  
  try {
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection("users");
    
    console.log("Fixing database...");
    
    // Drop any existing username indexes
    try {
      await usersCollection.dropIndex("username_1");
      console.log("✓ Dropped existing username_1 index");
    } catch (e) {
      console.log("- No username_1 index to drop");
    }
    
    try {
      await usersCollection.dropIndex("username_unique_partial");
      console.log("✓ Dropped existing username_unique_partial index");
    } catch (e) {
      console.log("- No username_unique_partial index to drop");
    }
    
    // Create partial unique index on username (only when username exists and is not null)
    await usersCollection.createIndex(
      { username: 1 },
      { 
        unique: true, 
        partialFilterExpression: { username: { $exists: true, $type: "string" } },
        name: "username_unique_partial"
      }
    );
    console.log("✓ Created partial unique index on username");
    
    // Ensure email index exists
    try {
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      console.log("✓ Ensured unique index on email");
    } catch (e) {
      console.log("- Email index already exists");
    }
    
    // Count users without username
    const usersWithoutUsername = await usersCollection.countDocuments({ 
      $or: [
        { username: null },
        { username: { $exists: false } }
      ]
    });
    
    console.log(`Found ${usersWithoutUsername} users without username - this is now OK`);
    
    console.log("✅ Database fixed successfully!");
    
  } catch (error) {
    console.error("❌ Error fixing database:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

fixDatabase();