import { useSocket } from "../../context/SocketContext";

function RoomCard({ user, selectedUser, setSelectedUser }) {
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition mb-2 ${
        selectedUser?._id === user._id
          ? "bg-slate-700"
          : "hover:bg-slate-700"
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-800"></span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">

        {/* Name + Unread Badge */}
        <div className="flex justify-between items-center">

          <h2 className="text-white font-semibold truncate">
            {user.fullName}
          </h2>

          {user.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-semibold rounded-full min-w-[22px] h-[22px] flex items-center justify-center">
              {user.unreadCount}
            </span>
          )}

        </div>

        {/* Last Message */}
        <p className="text-gray-400 text-sm truncate">
          {user.lastMessage
            ? user.lastMessage.text
            : isOnline
            ? "Online"
            : "Offline"}
        </p>

      </div>
    </div>
  );
}

export default RoomCard;