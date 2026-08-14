const Notification = require("../models/Notification");
const User = require("../models/User");

// ==========================
// Get Notifications
// ==========================
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Mark Notification As Read
// ==========================
const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Mark All Notifications As Read
// ==========================
const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        read: false,
      },
      {
        read: true,
      }
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Notification
// ==========================
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Notification Preferences
// ==========================
const getNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "notificationPreferences"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(
      user.notificationPreferences || {
        email: true,
        push: true,
        sessionReminders: true,
        matchAlerts: true,
        weeklyDigest: false,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Notification Preferences
// ==========================
const updateNotificationPreferences = async (req, res) => {
  try {
    const {
      email,
      push,
      sessionReminders,
      matchAlerts,
      weeklyDigest,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        notificationPreferences: {
          email,
          push,
          sessionReminders,
          matchAlerts,
          weeklyDigest,
        },
      },
      {
        new: true,
      }
    ).select("notificationPreferences");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Notification preferences updated successfully",
      preferences: user.notificationPreferences,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Create Notification
// ==========================
const createNotification = async (req, res) => {
  try {
    const {
      user,
      type,
      title,
      message,
      link,
    } = req.body;

    const notification = await Notification.create({
      user,
      type,
      title,
      message,
      link,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getNotificationPreferences,
  updateNotificationPreferences,
  createNotification,
};