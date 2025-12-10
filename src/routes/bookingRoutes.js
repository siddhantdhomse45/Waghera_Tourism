import express from "express";
import { handleCreateBooking, testBookingRoute } from "../controller/bookingController.js";

const router = express.Router();

// POST /api/bookings -> Create booking
router.post("/book", handleCreateBooking);

// GET /api/bookings -> Test endpoint
router.get("/", testBookingRoute);

export default router;
