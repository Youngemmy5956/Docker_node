import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongo";
import bodyParser from "body-parser";


// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app: Application = express();

// Middleware to enable CORS for specific origins
const allowedOrigins = ["http://localhost:3000", "https://www.homesynk.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();



// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});