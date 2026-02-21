import express from "express";
import { addReview, getBookReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Siapapun bisa melihat ulasan
router.get("/:book_id", getBookReviews);

// Hanya yang lolos verifyToken (Satpam) yang bisa post ulasan
router.post("/", verifyToken, addReview);

export default router;
