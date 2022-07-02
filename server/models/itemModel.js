import mongoose from "mongoose"

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    price: { type: String, required: true },
    deposit: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    condition: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("Item", itemSchema)
