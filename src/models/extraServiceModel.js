import mongoose from "mongoose";

const extraServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pricePerNight: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("ExtraService", extraServiceSchema);
