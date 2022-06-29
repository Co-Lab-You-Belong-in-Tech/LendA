import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  price: { type: String, required: true },
  deposit: { type: String },
  description: { type: String },
  category: { type: String, required: true },
  condition: { type: String, required: true },
})

export default mongoose.model("Item", itemSchema)
