const Conversation = require("../models/Conversation");
const Match = require("../models/Match");

// ==========================
// Create Conversation
// ==========================
const createConversation = async (req, res) => {
  try {
    const { participantId } = req.body;

    // Prevent chatting with yourself
    if (participantId === req.user.id) {
      return res.status(400).json({
        message: "You cannot create a conversation with yourself",
      });
    }

    // Check if an accepted match exists
const acceptedMatch = await Match.findOne({
  status: "Accepted",
  $or: [
    {
      sender: req.user.id,
      receiver: participantId,
    },
    {
      sender: participantId,
      receiver: req.user.id,
    },
  ],
});

if (!acceptedMatch) {
  return res.status(403).json({
    message: "You can only chat after an accepted match",
  });
}

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.user.id, participantId],
      },
    });

    if (conversation) {
      return res.status(200).json({
        message: "Conversation already exists",
        conversation,
      });
    }

    // Create conversation
    conversation = await Conversation.create({
      participants: [req.user.id, participantId],
    });

    res.status(201).json({
      message: "Conversation created successfully",
      conversation,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get My Conversations
// ==========================
const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("participants", "name profilePic city")
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createConversation,
  getMyConversations,
};