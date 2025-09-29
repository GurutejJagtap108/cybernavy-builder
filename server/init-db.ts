import { getDb } from "./db";

export async function initializeDatabase() {
  try {
    const db = await getDb();
    const usersCollection = db.collection("users");
    
    // Drop existing username index if it exists
    try {
      await usersCollection.dropIndex("username_1");
      console.log("Dropped existing username index");
    } catch (e) {
      // Index might not exist, that's fine
    }
    
    // Create partial unique index on username (only when username is not null)
    await usersCollection.createIndex(
      { username: 1 },
      { 
        unique: true, 
        partialFilterExpression: { username: { $exists: true, $type: "string" } },
        name: "username_unique_partial"
      }
    );
    
    // Ensure email index exists
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    
    console.log("Database indexes initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}