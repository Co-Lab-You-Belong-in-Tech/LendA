import mongoose from "mongoose"

// reminder update later !!!
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
