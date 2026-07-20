import { useEffect, useRef, useState } from "react";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";

import {
  getMessages,
  sendMessage,
  markMessagesSeen,
} from "../services/messageService";

import { useSocket } from "../context/SocketContext";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const { newMessage, messagesSeen } = useSocket();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  // ==========================
  // Load Messages
  // ==========================

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const data = await getMessages(selectedUser._id);
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // ==========================
  // Mark Messages as Seen
  // ==========================

  useEffect(() => {
    if (!selectedUser) return;

    const seenMessages = async () => {
      try {
        await markMessagesSeen(selectedUser._id);
        console.log("✅ Messages marked as seen");
      } catch (error) {
        console.error(error);
      }
    };

    seenMessages();
  }, [selectedUser]);

  // ==========================
  // Listen for New Messages
  // ==========================

  useEffect(() => {
    if (!newMessage || !selectedUser) return;

    const senderId =
      typeof newMessage.sender === "object"
        ? newMessage.sender._id
        : newMessage.sender;

    const receiverId =
      typeof newMessage.receiver === "object"
        ? newMessage.receiver._id
        : newMessage.receiver;

    if (
      senderId === selectedUser._id ||
      receiverId === selectedUser._id
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage, selectedUser]);

  // ==========================
  // Real-Time Seen Update
  // ==========================

  useEffect(() => {
    if (!messagesSeen || !selectedUser) return;

    console.log("👀 Updating Seen Status");

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
  }, [messagesSeen, selectedUser?._id, currentUserId]);

  // ==========================
  // Auto Scroll
  // ==========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==========================
  // Send Message
  // ==========================

  const handleSendMessage = async (text, image) => {
  try {
    const data = await sendMessage(
      selectedUser._id,
      text,
      image
    );

    setMessages((prev) => [...prev, data.data]);
  } catch (error) {
    console.error(error);
  }
};

   // ==========================
  // Delete Message
// ==========================

 const handleDeleteMessage = (messageId) => {
   setMessages((prev) =>
     prev.filter((message) => message._id !== messageId)
   );
 };

  return (
    <div className="flex h-screen bg-slate-900">
      <ChatSidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <ChatHeader user={selectedUser} />

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
                         />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-10">
                  No messages yet.
                </p>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            <MessageInput
              onSend={handleSendMessage}
              selectedUser={selectedUser}
              currentUser={currentUser}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-3xl text-gray-500">
              Select a chat 💬
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;