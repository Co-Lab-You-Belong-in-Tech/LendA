import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT || 8000
export const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
export const JWT_SECRET = process.env.JWT_SECRET
