import "dotenv/config";

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./sockets/socket.js";

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});