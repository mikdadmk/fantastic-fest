import { MongoClient } from 'mongodb';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoClient is not repeatedly instantiated
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to just use the client directly
  clientPromise = MongoClient.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function connectToDatabase() {
  client = await clientPromise;
  return client.db("fantastic");
}
