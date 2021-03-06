import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    deposit: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    availability: { type: Boolean, required: true },
    image: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);
