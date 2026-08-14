const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    interests: [
      {
        type: String,
      },
    ],

    city: {
      type: String,
      default: "",
    },

    timezone: {
      type: String,
      default: "",
    },

    availability: [
      {
        day: String,
        slots: [String],
      },
    ],

    notificationPreferences: {
  email: {
    type: Boolean,
    default: true,
  },
  push: {
    type: Boolean,
    default: true,
  },
  sessionReminders: {
    type: Boolean,
    default: true,
  },
  matchAlerts: {
    type: Boolean,
    default: true,
  },
  weeklyDigest: {
    type: Boolean,
    default: false,
  },
},

    // ⭐ Admin Role
isAdmin: {
  type: Boolean,
  default: false,
},

// ⭐ Admin moderation
isSuspended: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);