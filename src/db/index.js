import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected...", conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};
