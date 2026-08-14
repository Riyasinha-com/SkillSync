const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Notification = require("../models/Notification");

// ==========================
// Send Message
// ==========================
const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    if (
      !conversation.participants
        .map((id) => id.toString())
        .includes(req.user.id)
    ) {
      return res.status(403).json({
        message: "You are not part of this conversation",
      });
    }

    // ==========================
    // Create Message
    // ==========================
    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      text,
    });

    // ==========================
    // Create Notification
    // ==========================
    const recipients = conversation.participants.filter(
      (id) => id.toString() !== req.user.id
    );

    for (const recipient of recipients) {
      await Notification.create({
        user: recipient,
        type: "message",
        title: "New message",
        message: "You received a new message.",
        link: `/chat?conversation=${conversationId}`,
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Messages
// ==========================
const getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    if (
      !conversation.participants
        .map((id) => id.toString())
        .includes(req.user.id)
    ) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate("sender", "name profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};