import { useSocket } from "../../context/SocketContext";

function RoomCard({
  user,
  selectedUser,
  setSelectedUser,
  theme,
}) {
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(user._id);
  const isSelected = selectedUser?._id === user._id;

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200
      ${
        isSelected
          ? theme === "dark"
            ? "bg-slate-700 border-l-4 border-green-500 shadow-md"
            : "bg-green-100 border-l-4 border-green-500 shadow-md"
          : theme === "dark"
          ? "hover:bg-slate-700/80 hover:scale-[1.01]"
          : "hover:bg-gray-100 hover:scale-[1.01]"
      }`}
    >
      {/* Avatar */}

      <div className="relative flex-shrink-0">
        <div
          className={`w-13 h-13 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow
          ${
            theme === "dark"
              ? "ring-2 ring-slate-600"
              : "ring-2 ring-gray-300"
          }`}
        >
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        {isOnline && (
          <span
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 ${
              theme === "dark"
                ? "border-slate-800"
                : "border-white"
            }`}
          ></span>
        )}
      </div>

      {/* User Info */}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h2
            className={`font-semibold text-[15px] truncate ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {user.fullName}
          </h2>

          {user.unreadCount > 0 && (
            <span className="min-w-6 h-6 px-2 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shadow">
              {user.unreadCount}
            </span>
          )}
        </div>

        <p
          className={`text-sm truncate mt-1 ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          {user.lastMessage
            ? user.lastMessage.text
            : isOnline
            ? "🟢 Online"
            : "⚫ Offline"}
        </p>
      </div>
    </div>
  );
}

export default RoomCard;