import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";
import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messagesSeen, setMessagesSeen] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected:", newSocket.id);
    });

    newSocket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // ==========================
    // New Message
    // ==========================

    newSocket.on("newMessage", (message) => {
      console.log("📩 New Message:", message);

      // Show notification only for received messages
      if (
        user &&
        message.sender.toString() !== user._id.toString()
      ) {
        toast.success("📩 New Message");
      }

      setNewMessage(message);
    });

    // ==========================
    // Messages Seen
    // ==========================

    newSocket.on("messagesSeen", (data) => {
      console.log("👀 Messages Seen:", data);
      setMessagesSeen(data);
    });

    // ==========================
    // Typing
    // ==========================

    newSocket.on("typing", (senderId) => {
      setTypingUser(senderId);
    });

    newSocket.on("stopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("join", user._id);
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUser,
        newMessage,
        messagesSeen,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);