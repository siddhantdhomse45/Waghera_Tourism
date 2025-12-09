import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "syllabus",
    resource_type: "auto"    // ✅ allows PDF, DOCX, images, etc.
  }
});

const upload = multer({ storage });

export default upload;
