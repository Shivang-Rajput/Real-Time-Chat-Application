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

    // Text
    text: {
      type: String,
      trim: true,
      default: "",
    },

    // Image
    image: {
      type: String,
      default: "",
    },

    // ==========================
    // Reply Message
    // ==========================

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Seen
    seen: {
      type: Boolean,
      default: false,
    },

    // Delete For Me
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

// At least text or image
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