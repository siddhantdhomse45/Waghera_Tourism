import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
