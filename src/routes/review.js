import express from "express";
import { createReview, getAllReviews, deleteAllReviews } from "../controller/reviewController.js";

const router = express.Router();

// POST /api/reviews
router.post("/", createReview);

// GET /api/reviews
router.get("/", getAllReviews);

// DELETE /api/reviews
router.delete("/", deleteAllReviews);

export default router;
