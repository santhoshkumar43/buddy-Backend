import express from "express";
import mongoose from "mongoose";
import rootRouter from "./routes/root.route";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  "mongodb+srv://psanthoshkumar43:VtAC4vrAAGwXSo7Y@cluster0.pl3xn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const app = express();

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware and Routes
app.use(express.json());
app.use("/", rootRouter);
