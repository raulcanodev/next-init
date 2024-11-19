import { MongoClient } from 'mongodb';

async function testMongoDBConnection(uri) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  } finally {
    await client.close();
  }
}

// URI of MongoDB (replace with your own URI)
const mongoURI = ""

testMongoDBConnection(mongoURI);