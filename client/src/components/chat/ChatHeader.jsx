import { useSocket } from "../../context/SocketContext";

function ChatHeader({ user }) {
  const { typingUser, onlineUsers } = useSocket();

  const isTyping = typingUser === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div className="p-5 border-b border-slate-700 bg-slate-800">
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
            isOnline ? "text-green-400" : "text-gray-400"
          }`}
        >
          {isOnline ? "🟢 Online" : "⚪ Offline"}
        </p>
      )}
    </div>
  );
}

export default ChatHeader;