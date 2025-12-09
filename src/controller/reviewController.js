import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment, avatarUrl } = req.body;

    // Validation
    if (!name || !name.trim()) return res.status(400).json({ message: "Reviewer name cannot be empty." });
    if (!comment || !comment.trim()) return res.status(400).json({ message: "Review comment cannot be empty." });
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be between 1 and 5." });

    const review = new Review({ name, rating, comment, avatarUrl });
    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ message: "Server error while saving review." });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error while fetching reviews." });
  }
};

// Delete all reviews
export const deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany({});
    res.json({ message: "Successfully deleted all reviews." });
  } catch (err) {
    console.error("Error deleting reviews:", err);
    res.status(500).json({ message: "Server error while deleting reviews." });
  }
};
