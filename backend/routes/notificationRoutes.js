const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getNotificationPreferences,
  updateNotificationPreferences,
  createNotification,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's notifications
router.get("/", protect, getNotifications);

// Mark all notifications as read
router.put("/read-all", protect, markAllNotificationsRead);

// Get notification preferences
router.get("/preferences", protect, getNotificationPreferences);

// Update notification preferences
router.put("/preferences", protect, updateNotificationPreferences);

// Mark one notification as read
router.put("/:id/read", protect, markNotificationRead);

// Delete one notification
router.delete("/:id", protect, deleteNotification);

// Create notification
router.post("/", protect, createNotification);

module.exports = router;