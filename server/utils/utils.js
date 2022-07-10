import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

export const signJWT = async (id) => {
  const token = await jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: "1d" })
  return { token: `Bearer ${token}` }
}
