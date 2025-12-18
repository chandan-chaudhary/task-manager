import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import notificationRoutes from "./routes/notificationRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
