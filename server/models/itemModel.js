import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    deposit: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    condition: { type: String },
    available: { type: Boolean, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);
