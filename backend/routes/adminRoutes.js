const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllSkills,
  updateSkillVerification,
  getAllMatches,
  getAllSessions,
  getAllReviews,
  deleteReview,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// ==========================
// Admin Dashboard
// ==========================
router.get("/dashboard", protect, adminOnly, getAdminDashboard);

// ==========================
// Users
// ==========================
router.get("/users", protect, adminOnly, getAllUsers);

router.patch(
  "/users/:id/status",
  protect,
  adminOnly,
  updateUserStatus
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

// ==========================
// Skills
// ==========================
router.get("/skills", protect, adminOnly, getAllSkills);

router.patch(
  "/skills/:id/verification",
  protect,
  adminOnly,
  updateSkillVerification
);

// ==========================
// Matches
// ==========================
router.get("/matches", protect, adminOnly, getAllMatches);

// ==========================
// Sessions
// ==========================
router.get("/sessions", protect, adminOnly, getAllSessions);

// ==========================
// Reviews
// ==========================
router.get("/reviews", protect, adminOnly, getAllReviews);

router.delete(
  "/reviews/:id",
  protect,
  adminOnly,
  deleteReview
);

module.exports = router;