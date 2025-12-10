import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    adults: Number,
    children: Number,
    extraBed: Number,
    totalPrice: Number,
    extraServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExtraService" }]
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
