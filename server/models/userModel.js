import mongoose from "mongoose"

// reminder update later !!!
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)