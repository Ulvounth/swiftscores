import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/swiftscores";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// ✅ Correct type for the Mongoose connection cache
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// ✅ Properly extend `globalThis` to store the cached connection
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// ✅ Ensure `mongoose` exists on `globalThis`
globalThis.mongoose = globalThis.mongoose || { conn: null, promise: null };

// ✅ Use the correctly typed `cached` variable
const cached: MongooseCache = globalThis.mongoose;

export async function connectToDatabase() {
  console.log("🔍 connectToDatabase() function is being called...");

  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "swiftscores",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected!");
        return mongoose.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
