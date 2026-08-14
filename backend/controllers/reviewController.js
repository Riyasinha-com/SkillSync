const Review = require("../models/Review");
const Session = require("../models/Session");
const Skill = require("../models/Skill");

// ==========================
// Leave Review
// ==========================
const leaveReview = async (req, res) => {
  try {
    const { sessionId, rating, comment } = req.body;

    // Find the session
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Session must be completed
    if (session.status !== "Completed") {
      return res.status(400).json({
        message: "You can only review completed sessions",
      });
    }

    // Reviewer must be teacher or learner
    if (
      session.teacher.toString() !== req.user.id &&
      session.learner.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      session: sessionId,
      reviewer: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this session",
      });
    }

    // Determine reviewee
    const reviewee =
      session.teacher.toString() === req.user.id
        ? session.learner
        : session.teacher;

    // Save review
    const review = await Review.create({
      session: sessionId,
      reviewer: req.user.id,
      reviewee,
      rating,
      comment,
    });

    // Update reviewee's skill ratings
    const skills = await Skill.find({ owner: reviewee });

    for (const skill of skills) {
      const totalReviews = skill.totalReviews + 1;

      const averageRating =
        (skill.averageRating * skill.totalReviews + rating) /
        totalReviews;

      skill.totalReviews = totalReviews;
      skill.averageRating = averageRating;

      await skill.save();
    }

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewee: req.params.userId,
    })
      .populate("reviewer", "name profilePic")
      .populate({
        path: "session",
        populate: [
          {
            path: "teacher",
            select: "name profilePic",
          },
          {
            path: "learner",
            select: "name profilePic",
          },
          {
            path: "match",
            populate: [
              {
                path: "senderSkill",
                select: "title owner",
              },
              {
                path: "receiverSkill",
                select: "title owner",
              },
            ],
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get My Reviews
// ==========================
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewer: req.user.id,
    })
      .populate("reviewee", "name profilePic")
      .populate({
        path: "session",
        populate: {
          path: "match",
          populate: [
            { path: "senderSkill", select: "title" },
            { path: "receiverSkill", select: "title" },
          ],
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  leaveReview,
  getReviewsByUser,
  getMyReviews,
};