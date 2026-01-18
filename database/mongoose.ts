import mongoose from 'mongoose';

// Read environment variables inside functions to ensure they're loaded
// This is especially important for standalone scripts that use dotenv
const getMongoUri = () => process.env.MONGODB_URI;
const getNodeEnv = () => process.env.NODE_ENV;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  const MONGODB_URI = getMongoUri();
  const NODE_ENV = getNodeEnv();

  if (!MONGODB_URI) {
    throw new Error('Missing MongoDB URI');
  }

  // If already connected, return cached connection (syncIndexes already ran)
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;

    await mongoose.connection.syncIndexes();
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  console.log(
    `Connected to database ${NODE_ENV ?? 'development'} - ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`
  );
  return cached.conn;
};
