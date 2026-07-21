import { useEffect, useState } from "react";
import { User } from "lucide-react";

import RoomCard from "./RoomCard";
import ProfileModal from "./ProfileModal";

import { getUsers } from "../../services/roomService";
import { useSocket } from "../../context/SocketContext";

function ChatSidebar({
  selectedUser,
  setSelectedUser,
  theme,
}) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const { newMessage } = useSocket();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  if (!newMessage) return;
  fetchUsers();
}, [newMessage]);

// =====================
// Filter users by search
// =====================
const filteredUsers = users.filter((user) =>
  user.fullName.toLowerCase().includes(search.toLowerCase())
);

return (
    <>
      <div
        className={`w-80 h-screen border-r flex flex-col shadow-xl transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}

        <div
          className={`p-5 border-b ${
            theme === "dark"
              ? "border-slate-700"
              : "border-gray-300"
          }`}
        >
          <h1
            className={`text-3xl font-bold tracking-wide ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Chats 💬
          </h1>

          <p
            className={`text-sm mt-1 ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Stay connected with your friends
          </p>
        </div>

        {/* Search */}

        <div className="p-4">
          <input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className={`w-full rounded-xl px-4 py-3 outline-none border transition ${
    theme === "dark"
      ? "bg-slate-700 text-white border-transparent focus:border-green-500"
      : "bg-gray-100 text-slate-900 border-gray-300 focus:border-green-500"
  }`}
/>
        </div>

        {/* Users */}

        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <RoomCard
                key={user._id}
                user={user}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                theme={theme}
                />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p
                className={
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              >
                No users found.
              </p>
            </div>
          )}
        </div>

        {/* Profile */}

        <div
          className={`p-4 border-t ${
            theme === "dark"
              ? "border-slate-700"
              : "border-gray-300"
          }`}
        >
          <button
            onClick={() => setShowProfile(true)}
            className={`w-full flex items-center justify-center gap-3 rounded-xl py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-slate-900"
            }`}
          >
            <User size={20} />
            Profile
          </button>
        </div>
      </div>

      {showProfile && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfile(false)}
          theme={theme}
        />
      )}
    </>
  );
}

export default ChatSidebar;