import { Moon, Sun } from "lucide-react";
import { useSocket } from "../../context/SocketContext";

function ChatHeader({
  user,
  theme,
  toggleTheme,
}) {
  const { typingUser, onlineUsers } = useSocket();

  const isTyping = typingUser === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div className="flex items-center justify-between p-5 border-b border-slate-700 bg-slate-800">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          {user.fullName}
        </h1>

        {isTyping ? (
          <p className="text-green-400 text-sm animate-pulse">
            Typing...
          </p>
        ) : (
          <p
            className={`text-sm ${
              isOnline
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {isOnline ? "🟢 Online" : "⚪ Offline"}
          </p>
        )}
      </div>

      {/* Theme Toggle */}

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition"
      >
        {theme === "dark" ? (
          <Sun
            size={22}
            className="text-yellow-300"
          />
        ) : (
          <Moon
            size={22}
            className="text-slate-900"
          />
        )}
      </button>

    </div>
  );
}

export default ChatHeader;