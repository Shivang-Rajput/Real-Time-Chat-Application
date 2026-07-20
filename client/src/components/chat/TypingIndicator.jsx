import { useSocket } from "../../context/SocketContext";

function TypingIndicator({ selectedUser }) {
  const { typingUser } = useSocket();

  if (!selectedUser) return null;

  if (typingUser !== selectedUser._id) return null;

  return (
    <div className="px-5 py-2 text-sm text-green-400 italic animate-pulse">
      {selectedUser.fullName} is typing...
    </div>
  );
}

export default TypingIndicator;