import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getIO, getReceiverSocketId } from "../sockets/socket.js";
import cloudinary from "../config/cloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;

    let { text, replyTo } = req.body;

    let imageUrl = "";

    // Upload image if exists
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "RealtimeChat",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      imageUrl = uploaded.secure_url;
    }

    // Prevent empty message
    if (!text && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // Find Conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create Message
    const message = await Message.create({
  conversationId: conversation._id,
  sender: senderId,
  receiver: receiverId,
  text: text || "",
  image: imageUrl,
  replyTo: replyTo || null,
});

    conversation.lastMessage = message._id;
    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
  .populate("replyTo");

    // Real-time socket
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      getIO().to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json({
      success: true,
      data: populatedMessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;

    // Find conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // No conversation yet
    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    // Get all messages
   const messages = await Message.find({
  conversationId: conversation._id,
  deletedFor: {
    $ne: senderId,
  },
})
.populate({
  path: "replyTo",
  select: "text image sender",
})
.sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const markMessagesSeen = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const senderId = req.params.userId;

    await Message.updateMany(
      {
        sender: senderId,
        receiver: receiverId,
        seen: false,
      },
      {
        seen: true,
      }
    );

    // Notify sender instantly
    const senderSocketId = getReceiverSocketId(senderId);

    if (senderSocketId) {
      getIO().to(senderSocketId).emit("messagesSeen", {
        senderId,
        receiverId,
      });
    }

    console.log("✅ Messages marked as seen");

    res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// Delete Message (Delete For Me)
// ==========================================

export const deleteMessageForMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Already deleted?
    if (
      message.deletedFor.some(
        (id) => id.toString() === userId.toString()
      )
    ) {
      return res.status(200).json({
        success: true,
        message: "Already deleted",
      });
    }

    message.deletedFor.push(userId);

    await message.save();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      messageId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};