import { useEffect, useState } from "react";
import { User } from "lucide-react";

import RoomCard from "./RoomCard";
import ProfileModal from "./ProfileModal";

import { getUsers } from "../../services/roomService";
import { useSocket } from "../../context/SocketContext";

function ChatSidebar({
  selectedUser,
  setSelectedUser,
}) {
  const [users, setUsers] = useState([]);
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

  // Initial Load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh sidebar whenever a new message arrives
  useEffect(() => {
    if (!newMessage) return;

    fetchUsers();
  }, [newMessage]);

  return (
    <>
      <div className="w-80 h-screen bg-slate-800 border-r border-slate-700 flex flex-col">

        {/* Header */}
        <div className="p-5 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">
            Chats 💬
          </h1>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-lg bg-slate-700 text-white px-4 py-2 outline-none"
          />
        </div>

        {/* Users */}
        <div className="flex-1 overflow-y-auto px-2">
          {users.length > 0 ? (
            users.map((user) => (
              <RoomCard
                key={user._id}
                user={user}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-5">
              No users found.
            </p>
          )}
        </div>

        {/* Profile Button */}
        <div className="border-t border-slate-700 p-4">

          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-3 transition"
          >
            <User size={20} />
            Profile
          </button>

        </div>

      </div>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
}

export default ChatSidebar;