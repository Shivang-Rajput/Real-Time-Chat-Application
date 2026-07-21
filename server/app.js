import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.Routes.js";
import messageRoutes from "./routes/message.Routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local React app
      "https://your-frontend-url.vercel.app", // Replace after deployment
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Real-Time Chat API 🚀",
  });
});

export default app;