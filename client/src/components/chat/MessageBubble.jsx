import { Trash2 } from "lucide-react";
import { deleteMessage } from "../../services/messageService";

function MessageBubble({
  message,
  isOwnMessage,
  onDelete,
}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMessage(message._id);

      onDelete(message._id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete message.");
    }
  };

  return (
    <div
      className={`flex mb-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div className="relative group">

        {/* Delete Button */}

        {isOwnMessage && (
          <button
            onClick={handleDelete}
            className="absolute -left-9 top-2 opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2
              size={18}
              className="text-red-400 hover:text-red-600"
            />
          </button>
        )}

        {/* Message */}

        <div
          className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl break-words ${
            isOwnMessage
              ? "bg-green-500 text-white rounded-br-sm"
              : "bg-slate-700 text-white rounded-bl-sm"
          }`}
        >
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
            <p>{message.text}</p>
          )}

          {/* Time */}

          <p className="text-[10px] text-right mt-1 opacity-70">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Seen */}

          {isOwnMessage && (
            <p className="text-[10px] text-right">
              {message.seen ? "✓✓" : "✓"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;