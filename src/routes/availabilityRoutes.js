import express from "express";
import { handleCheckAvailability } from "../controller/availabilityController.js";

const router = express.Router();

// POST /api/availability
router.post("/", handleCheckAvailability);

export default router;
