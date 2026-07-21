import { Trash2, Reply } from "lucide-react";
import toast from "react-hot-toast";

import { deleteMessage } from "../../services/messageService";

function MessageBubble({
  message,
  isOwnMessage,
  onDelete,
  onReply,
  theme,
}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMessage(message._id);

      onDelete(message._id);

      toast.success("Message deleted successfully 🗑️");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete message.");
    }
  };

  return (
    <div
      className={`flex mb-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div className="relative group max-w-xs md:max-w-md">

        {/* Action Buttons */}

        <div
          className={`absolute top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-200 z-20 ${
            isOwnMessage ? "-left-16" : "-right-16"
          }`}
        >
          <button
            type="button"
            onClick={() => onReply(message)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            title="Reply"
          >
            <Reply size={16} />
          </button>

          {isOwnMessage && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Message */}

        <div
          className={`px-4 py-2 rounded-2xl break-words shadow transition-all duration-300 ${
            isOwnMessage
              ? "bg-green-500 text-white rounded-br-sm"
              : theme === "dark"
              ? "bg-slate-700 text-white rounded-bl-sm"
              : "bg-white text-slate-900 border border-gray-200 rounded-bl-sm"
          }`}
        >
          {/* Reply Preview */}

          {message.replyTo && (
            <div
              className={`mb-2 px-3 py-2 rounded-lg border-l-4 ${
                isOwnMessage
                  ? "bg-green-600 border-white/60"
                  : theme === "dark"
                  ? "bg-slate-600 border-green-400"
                  : "bg-gray-100 border-green-500"
              }`}
            >
              <p className="text-xs font-semibold">
                Reply
              </p>

              {message.replyTo.text && (
                <p className="text-sm truncate">
                  {message.replyTo.text}
                </p>
              )}

              {message.replyTo.image && (
                <p className="text-xs">
                  📷 Photo
                </p>
              )}
            </div>
          )}

          {/* Image */}

          {message.image && (
            <img
              src={message.image}
              alt="shared"
              className="rounded-lg mb-2 max-w-[250px]"
            />
          )}

          {/* Text */}

          {message.text && (
            <p className="whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}

          {/* Time */}

          <p
            className={`text-[10px] text-right mt-2 ${
              isOwnMessage
                ? "text-white/70"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Seen */}

          {isOwnMessage && (
            <p className="text-[10px] text-right text-white/80">
              {message.seen ? "✓✓" : "✓"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;