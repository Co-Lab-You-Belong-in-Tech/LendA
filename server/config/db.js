import mongoose from "mongoose"
import { CONNECTION_STRING } from "./config.js"

export const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(CONNECTION_STRING)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.log("Failed to connect to MongoDB", error)
  }
}
