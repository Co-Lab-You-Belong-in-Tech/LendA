import mongoose from 'mongoose';

// reminder update later !!!
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    first: { type: String },
    last: { type: String },
    password: { type: String, required: true },
    zipcode: { type: Number },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
