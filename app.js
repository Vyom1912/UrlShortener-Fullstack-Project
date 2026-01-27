import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force dotenv to load .env in the same folder as app.js
dotenv.config({ path: path.join(__dirname, ".env") });

// DEBUG: verify env is loaded
console.log("ENV:", {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,
});

import express from "express";
// if use default export router in routes/shortener.routes.js
// import { Router } from "express";
// or
// import * as shortenerRoutes from "./routes/shortener.routes.js";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { dbClient } from "./config/db-client.js";

await dbClient.connect();
console.log("Connected to MongoDB");

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// express app use the router
// if use default export router in routes/shortener.routes.js
// app.use("/", router);
// or
app.use("/", shortenerRouter);
// view engine setup
app.set("view engine", "ejs");
// routes
app.set("views", "./views"); // it is default value so not necessary to write
// app.use("/", shortener.routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
