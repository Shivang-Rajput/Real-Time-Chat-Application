import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Text Message
    text: {
      type: String,
      trim: true,
      default: "",
    },

    // Image URL (Cloudinary)
    image: {
      type: String,
      default: "",
    },

    // Seen Status
    seen: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Delete For Me
    // ==========================
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure at least one of text or image exists
messageSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    this.invalidate(
      "text",
      "Message must contain either text or an image."
    );
  }

  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;