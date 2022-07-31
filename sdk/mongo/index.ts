import { Db, MongoClient, MongoClientOptions } from 'mongodb';

export { ObjectId } from 'mongodb';

interface MongoOptions {
  uri?: string;
  dbName?: string;
  options?: MongoClientOptions;
}

type _mongoClientPromise = Promise<MongoClient> | undefined;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function getMongoClientPromise(
  uri = 'mongodb://localhost:27017',
  options: MongoClientOptions = {
    ignoreUndefined: true,
  },
) {
  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!((global as any)._mongoClientPromise as _mongoClientPromise)) {
      client = new MongoClient(uri, options);
      (global as any)._mongoClientPromise = client.connect();
      console.info('created a new connection');
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function connectMongo({ uri, dbName, options }: MongoOptions = {}): Promise<MongoDB> {
  const client = await getMongoClientPromise(uri, options);
  const db = client.db(dbName || 'test');

  return new MongoDB(client, db);
}

export class MongoDB {
  client: MongoClient;
  db: Db;

  constructor(client: MongoClient, db: Db) {
    this.client = client;
    this.db = db;
  }
}
