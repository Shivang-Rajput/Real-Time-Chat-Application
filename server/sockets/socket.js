import { Server } from "socket.io";

let io;

// userId -> Set<socketId>
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    // ===================================
    // JOIN
    // ===================================

    socket.on("join", (userId) => {
      if (!userId) return;

      socket.userId = userId;

      // Get existing sockets or create a new Set
      let sockets = onlineUsers.get(userId);

      if (!sockets) {
        sockets = new Set();
      }

      sockets.add(socket.id);

      onlineUsers.set(userId, sockets);

      console.log("✅ User Joined:", userId);
      console.log(
        "🟢 Online Users:",
        [...onlineUsers.keys()]
      );

      io.emit("onlineUsers", [...onlineUsers.keys()]);
    });

    // ===================================
    // TYPING
    // ===================================

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSockets = onlineUsers.get(receiverId);

      if (!receiverSockets) return;

      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("typing", senderId);
      });
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSockets = onlineUsers.get(receiverId);

      if (!receiverSockets) return;

      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("stopTyping", senderId);
      });
    });

    // ===================================
    // DISCONNECT
    // ===================================

    socket.on("disconnect", (reason) => {
      console.log("🔴 User Disconnected:", socket.id);
      console.log("❗ Reason:", reason);

      const userId = socket.userId;

      if (userId) {
        const sockets = onlineUsers.get(userId);

        if (sockets) {
          sockets.delete(socket.id);

          if (sockets.size === 0) {
            onlineUsers.delete(userId);
            console.log("🗑 Removed User:", userId);
          } else {
            onlineUsers.set(userId, sockets);
          }
        }
      }

      console.log(
        "🟢 Remaining Online Users:",
        [...onlineUsers.keys()]
      );

      io.emit("onlineUsers", [...onlineUsers.keys()]);
    });
  });

  return io;
};

export const getIO = () => io;

// Returns one socket ID for sending messages
export const getReceiverSocketId = (userId) => {
  const sockets = onlineUsers.get(userId);

  if (!sockets || sockets.size === 0) {
    return null;
  }

  return [...sockets][0];
};