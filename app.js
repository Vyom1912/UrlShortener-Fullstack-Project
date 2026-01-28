import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { dbClient } from "./config/db.js";

await dbClient.connect();
console.log("MongoDB connected");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", shortenerRouter);
// view engine setup
app.set("view engine", "ejs");
// routes
app.set("views", "./views");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
