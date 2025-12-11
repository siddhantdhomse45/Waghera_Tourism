import GalleryImage from "../models/GalleryImage.js";
import cloudinary from "../config/cloudinary.js";

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    const { category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "waghera_gallery", // optional: store in a folder
      resource_type: "image",
    });

    // Save URL to MongoDB
    const galleryImage = new GalleryImage({
      url: result.secure_url,
      category,
    });

    await galleryImage.save();

    res.status(201).json({ url: galleryImage.url, category: galleryImage.category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get images by category
export const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await GalleryImage.find({ category });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


