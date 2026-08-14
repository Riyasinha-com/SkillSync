const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["Teach", "Learn"],
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Experience in years
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Portfolio / Certificate / GitHub / Drive link
    proofUrl: {
      type: String,
      default: "",
    },

    // Whether user is currently accepting swaps
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Admin verification
    verified: {
      type: Boolean,
      default: false,
    },

    // Rating System
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);