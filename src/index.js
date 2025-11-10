// dotenv.config({ path: "./env" });  // Load environment variables from .env file

import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

connectDB();

// This is the second approach to connect to MongoDB and start the Express server.

// This is the first approach to connect to MongoDB and start the Express server.
// IIFE to allow async/await usage at the top level, ; is used to prevent issues with certain linters
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.log("Express app error:", err);
//       throw err;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log("App is listening on port", process.env.PORT);
//     });
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//   }
// })();
