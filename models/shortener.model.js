// import { readFile, writeFile } from "fs/promises";
// import path from "path";

// // const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data || "{}");
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };

// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links), "utf-8");
// };

import { dbClient } from "../config/db-client.js";
await dbClient.connect();
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);

const shortenerCollection = db.collection("shorteners");

export const loadLinks = async () => {
  return await shortenerCollection.find().toArray();
};

export const saveLinks = async (links) => {
  return await shortenerCollection.insertOne(links);
};

export const getLinkByShortCode = async (shortCode) => {
  return await shortenerCollection.find({ shortCode: shortCode });
};
