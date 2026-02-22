import express from "express";
import {
  updateReadingStatus,
  getBookStatus,
  getUserReadingList,
} from "../controllers/readingListController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Semua aksi rak buku wajib login (verifyToken)
router.post("/status", verifyToken, updateReadingStatus);
router.get("/status/:book_id", verifyToken, getBookStatus);
router.get("/", verifyToken, getUserReadingList);
export default router;
