import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";
import toast from "react-hot-toast";

import { useAuth } from "./AuthContext.jsx";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messagesSeen, setMessagesSeen] = useState(null);

  useEffect(() => {
    // ==========================
    // Production Safe Backend URL
    // ==========================

    const API_URL =
      import.meta.env.VITE_API_URL ||
      "https://real-time-chat-application-backend-mprn.onrender.com/api";

    const SOCKET_URL = API_URL.replace("/api", "");

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket Connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket Error:", err.message);
    });

    newSocket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // ==========================
    // New Message
    // ==========================

    newSocket.on("newMessage", (message) => {
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