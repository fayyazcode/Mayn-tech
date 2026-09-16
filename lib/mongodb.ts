import mongoose, { type Mongoose } from "mongoose";

const uri = process.env.MONGODB_URI;

/**
 * Next.js reloads modules in development and runs many serverless instances in
 * production, so the connection is cached on globalThis rather than reopened
 * per request. Opening a new pool per invocation is how Mongo apps run out of
 * connections under load.
 */
interface Cache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalForMongo = globalThis as unknown as { mongoose?: Cache };
const cached: Cache = globalForMongo.mongoose ?? { conn: null, promise: null };
globalForMongo.mongoose = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!uri) {
    throw new Error("MONGODB_URI is not set. Copy .env.example to .env and add your connection string.");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
