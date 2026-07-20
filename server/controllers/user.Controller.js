import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ==========================================
// Get Users
// ==========================================
export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: currentUserId },
    }).select("-password");

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const conversation = await Conversation.findOne({
          participants: { $all: [currentUserId, user._id] },
        }).populate("lastMessage");

        const unreadCount = await Message.countDocuments({
          sender: user._id,
          receiver: currentUserId,
          seen: false,
        });

        return {
          ...user.toObject(),
          lastMessage: conversation?.lastMessage || null,
          unreadCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      users: usersWithDetails,
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
// Update Profile
// ==========================================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Name
    if (req.body.fullName) {
      user.fullName = req.body.fullName.trim();
    }

    // Upload Avatar
    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "RealtimeChat/avatar",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();

      user.avatar = result.secure_url;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully 🎉",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};