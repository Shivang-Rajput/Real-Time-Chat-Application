import { useState, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import EmojiPicker from "emoji-picker-react";
import {
  Image,
  Smile,
  X,
  SendHorizontal,
} from "lucide-react";

function MessageInput({
  onSend,
  selectedUser,
  currentUser,
}) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef();

  const { socket } = useSocket();

  const typingTimeout = useRef(null);

  // =====================
  // Typing
  // =====================

  const handleChange = (e) => {
    const value = e.target.value;

    setText(value);

    if (!socket || !selectedUser) return;

    socket.emit("typing", {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });
    }, 1000);
  };

  // =====================
  // Emoji
  // =====================

  const handleEmoji = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  // =====================
  // Image
  // =====================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // =====================
  // Send
  // =====================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;

    onSend(text, image);

    setText("");
    setImage(null);
    setPreview("");

    if (socket && selectedUser) {
      socket.emit("stopTyping", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });
    }
  };

  return (
    <>
      {preview && (
        <div className="px-5 py-3 bg-slate-800 border-t border-slate-700">

          <div className="relative w-fit">

            <img
              src={preview}
              alt=""
              className="w-36 rounded-lg"
            />

            <button
              onClick={() => {
                setImage(null);
                setPreview("");
              }}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X size={15} color="white" />
            </button>

          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative p-4 border-t border-slate-700 bg-slate-800 flex items-center gap-3"
      >
        {/* Emoji */}

        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <Smile
            className="text-gray-300"
            size={24}
          />
        </button>

        {showEmoji && (
          <div className="absolute bottom-20 left-2 z-50">
            <EmojiPicker onEmojiClick={handleEmoji} />
          </div>
        )}

        {/* Image */}

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          <Image
            className="text-gray-300"
            size={24}
          />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImage}
        />

        {/* Input */}

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={handleChange}
          className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-full outline-none"
        />

        {/* Send */}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition"
        >
          <SendHorizontal
            color="white"
            size={20}
          />
        </button>
      </form>
    </>
  );
}

export default MessageInput;