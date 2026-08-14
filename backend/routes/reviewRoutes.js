const express = require("express");
const router = express.Router();

const {
  leaveReview,
  getReviewsByUser,
  getMyReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Leave Review
router.post("/", protect, leaveReview);

// Get My Reviews
router.get("/my", protect, getMyReviews);


// Get Reviews By User
router.get("/:userId", protect, getReviewsByUser);

module.exports = router;