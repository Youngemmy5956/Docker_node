import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


const connectDB = async (): Promise<void> => {
  try {
    const username = encodeURIComponent(process.env.MONGODB_USERNAME as string);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD as string);
    const uri = `mongodb+srv://${username}:${password}@cluster0.ydxr6zv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    console.log(`Connecting to MongoDB with URI: ${uri}`);
    const conn = await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    console.error(`Full error: ${JSON.stringify(error, null, 2)}`);
    if ((error as any).cause) {
      console.error(`Cause: ${(error as any).cause}`);
    }
    process.exit(1);
  }
};

export default connectDB;