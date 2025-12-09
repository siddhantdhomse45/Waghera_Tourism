import mongoose from "mongoose";

const AdminRoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED", "MAINTENANCE"], // Same as RoomStatus Enum
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdminRoom", AdminRoomSchema);
