import { useEffect, useRef, useState } from "react";

import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatHeader from "../components/chat/ChatHeader.jsx";
import MessageBubble from "../components/chat/MessageBubble.jsx";
import MessageInput from "../components/chat/MessageInput.jsx";

import {
  getMessages,
  sendMessage,
  markMessagesSeen,
} from "../services/messageService.js";

import { useSocket } from "../context/SocketContext.jsx";

function Chat({ theme, toggleTheme }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);

  const [replyMessage, setReplyMessage] = useState(null);

  const messagesEndRef = useRef(null);

  const { newMessage, messagesSeen } = useSocket();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  // ==========================
  // Load Messages
  // ==========================

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(selectedUser._id);
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // ==========================
  // Mark Seen
  // ==========================

  useEffect(() => {
    if (!selectedUser) return;

    markMessagesSeen(selectedUser._id).catch(console.error);
  }, [selectedUser]);

  // ==========================
  // Receive Message
  // ==========================

  useEffect(() => {
    if (!newMessage || !selectedUser) return;

    const sender =
      typeof newMessage.sender === "object"
        ? newMessage.sender._id
        : newMessage.sender;

    const receiver =
      typeof newMessage.receiver === "object"
        ? newMessage.receiver._id
        : newMessage.receiver;

    if (
      sender === selectedUser._id ||
      receiver === selectedUser._id
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage, selectedUser]);

  // ==========================
  // Seen Update
  // ==========================

  useEffect(() => {
    if (!messagesSeen || !selectedUser) return;

    setMessages((prev) =>
      prev.map((msg) => {
        const sender =
          typeof msg.sender === "object"
            ? msg.sender._id
            : msg.sender;

        const receiver =
          typeof msg.receiver === "object"
            ? msg.receiver._id
            : msg.receiver;

        if (
          sender === currentUserId &&
          receiver === selectedUser._id &&
          !msg.seen
        ) {
          return {
            ...msg,
            seen: true,
          };
        }

        return msg;
      })
    );
  }, [messagesSeen, selectedUser, currentUserId]);

  // ==========================
  // Auto Scroll
  // ==========================

  useEffect(() => {
  const timer = setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, 50);

  return () => clearTimeout(timer);
}, [messages]);

  // ==========================
  // Send Message
  // ==========================

 const handleSendMessage = async (
  text,
  image,
  replyMessage
) => {

  try {
    const data = await sendMessage(
      selectedUser._id,
      text,
      image,
      replyMessage
    );


    setMessages((prev) => {
      
      const updated = [...prev, data.data];

      
      return updated;
    });

    setReplyMessage(null);
  } catch (err) {
    console.error("SEND ERROR:", err);
  }
};

  // ==========================
  // Delete
  // ==========================

  const handleDeleteMessage = (id) => {
    setMessages((prev) =>
      prev.filter((msg) => msg._id !== id)
    );
  };

  const handleReplyMessage = (message) => {
  console.log("Reply clicked:", message);
  setReplyMessage(message);
};

// ==========================
// DEBUG
// ==========================
  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-slate-900"
          : "bg-gray-100"
      }`}
    >
      <ChatSidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        theme={theme}
      />

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <ChatHeader
              user={selectedUser}
              theme={theme}
              toggleTheme={toggleTheme}
            />

            <div className="flex-1 overflow-y-auto p-5">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageBubble
  key={message._id}
  message={message}
  isOwnMessage={
    (
      typeof message.sender === "object"
        ? message.sender._id
        : message.sender
    ) === currentUser._id
  }
  onDelete={handleDeleteMessage}
  onReply={handleReplyMessage}
  theme={theme}
/>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-10">
                  No messages yet.
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <MessageInput
  onSend={handleSendMessage}
  selectedUser={selectedUser}
  currentUser={currentUser}
  replyMessage={replyMessage}
  setReplyMessage={setReplyMessage}
  theme={theme}
/>
          </>
        ) : (
          <div
            className={`flex-1 flex items-center justify-center ${
              theme === "dark"
                ? "bg-slate-900"
                : "bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-7xl mb-5">💬</div>

              <h1
                className={`text-4xl font-bold mb-3 ${
                  theme === "dark"
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Welcome to Real-Time Chat
              </h1>

              <p
                className={`text-lg ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                Select a conversation to start chatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;