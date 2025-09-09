const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  addReview,
  getBookReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  likeReview,
  replyToReview
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", auth, addReview);
router.get("/book/:bookId", getBookReviews);
router.get("/user", auth, getUserReviews);
router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);
router.post("/:id/like", auth, likeReview);
router.post("/:id/reply", auth, replyToReview);

module.exports = router;
