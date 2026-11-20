/**
 * config/db.js — opens and closes the MongoDB Atlas connection.
 *
 * Connects to: config/env.js (MONGODB_URI), server.js (calls connectDB on start
 * and disconnectDB on shutdown). Models in models/ use this same connection
 * automatically — mongoose keeps one shared default connection.
 */
import mongoose from "mongoose";
import { env, isProduction } from "./env.js";

export async function connectDB() {
  try{

    // ignore unknown fields in query filters
    mongoose.set("strictQuery", true);

    // DIsable automatic index creation in production
    const isProduction = env.NODE_ENV === "production";

    // connect to MongoDB
    await mongoose.connect(env.MONGODB_WRL, {
      autoIndex: !isProduction,
    });

    // log connection info
    console.log(`MongoDB connected: ${mongoose.connection.host}`);

    // listen to connection events
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", ()=>{
      console.warn("MongoDB disconnected!");
    });
  }catch (error){
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }

}

export async function disconnectDB() {
  // TODO: await mongoose.connection.close()
  try{
    await mongoose.connection.close();
    console.log("MongoDB disconnected successfully.");
  }catch(error){
    console.error("MongoDB disconnection failed:", error.message);
    throw error;
  }
}
