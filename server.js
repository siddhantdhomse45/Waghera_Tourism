import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./src/config/db.js";
import galleryRoutes from './src/routes/gallery.js';
import adminRoomRoutes from './src/routes/adminRoomRoutes.js';
import reviewRoutes from './src/routes/review.js'
import contactRoutes from './src/routes/contact.js'
import authRoutes from './src/routes/auth.js'

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // only allow frontend origin
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // if using local images

// API Routes
app.use("/api/admin/rooms", adminRoomRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
// Catch all for unhandled routes
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
