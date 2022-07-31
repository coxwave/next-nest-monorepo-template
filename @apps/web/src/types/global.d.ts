import type { MongoClient } from 'mongodb';

declare global {
  type OurDate = Date | string;

  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
