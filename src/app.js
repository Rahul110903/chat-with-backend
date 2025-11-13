import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // Enable CORS with specified origin and credentials

app.use(express.json({ limit: "16kb" })); // json body limit set to 16kb
app.use(express.urlencoded({ limit: "16kb", extended: true })); // to parse URL-encoded bodies like rahul.com?name=singh&age=30, extended: true to parse nested objects
app.use(express.static("public")); // to serve static files from 'public' directory
app.use(cookieParser()); // to parse cookies from request headers

export { app };
