import mongoose from "mongoose"
import { NODE_ENV, CONNECTION_STRING } from "./config.js"

export const connectMongo = async () => {
  try {
    if (NODE_ENV === "production") {
      const connection = await mongoose.connect(CONNECTION_STRING)
      console.log(`MongoDB connected: ${connection.connection.host}`)
    } else {
      const connection = await mongoose.connect("mongodb://localhost/lenda")
      console.log(`MongoDB connected: ${connection.connection.host}`)
    }
  } catch (error) {
    console.log("Failed to connect to MongoDB", error)
  }
}
