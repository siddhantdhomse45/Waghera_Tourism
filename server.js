import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoomRoutes from "./routes/adminRoomRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/admin/rooms", adminRoomRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
