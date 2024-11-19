import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add these options to help with timeouts
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
};

let clientPromise: Promise<MongoClient>;
let mongooseConnection: Promise<typeof mongoose>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
    _mongooseConnection?: Promise<typeof mongoose>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;

  if (!globalWithMongo._mongooseConnection) {
    globalWithMongo._mongooseConnection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    }).catch((err) => {
      console.error('Failed to connect to MongoDB with Mongoose', err);
      throw err;
    });
  }
  mongooseConnection = globalWithMongo._mongooseConnection;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  });

  mongooseConnection = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  }).catch((err) => {
    console.error('Failed to connect to MongoDB with Mongoose', err);
    throw err;
  });
}

export { clientPromise, mongooseConnection };