import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const dbClient = new MongoClient(env.MONGODB_URI, {
  tls: true,
  serverApi: { version: "1", strict: true, deprecationErrors: true },
});
export const db = dbClient.db(env.MONGODB_DATABASE_NAME);
