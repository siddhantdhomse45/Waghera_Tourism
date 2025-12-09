import express from "express";
import upload from '../middleware/multer.js'; // your Multer config
import {
  uploadImage,
  getAllImages,
  getImagesByCategory,
} from "../controller/galleryController.js";

const router = express.Router();

// Upload image route
router.post("/upload", upload.single("file"), uploadImage);

// Get all images
router.get("/all", getAllImages);

// Get images by category
router.get("/category/:category", getImagesByCategory);

export default router;
