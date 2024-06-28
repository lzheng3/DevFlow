import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strict", true);
  if (!process.env.MONGODB_URI) return console.log("Missing MONGODB_URI");
  if (isConnected) return console.log("Already connected to the database");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "DevFlow",
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
  }
};
