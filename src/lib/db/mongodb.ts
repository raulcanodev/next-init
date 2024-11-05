import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

/**
 * Connects to the MongoDB database.
 *
 * @returns A promise that resolves to a boolean indicating if the connection was successful.
 */
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return Promise.reject(error);
  }
};

