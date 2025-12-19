import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "./database";

export interface AuthenticatedSocket extends Socket {
  userId?: number;
  userEmail?: string;
}

let io: Server | null = null;

export const initializeSocket = (httpServer: HTTPServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { id: number; email: string };

      // Verify user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      socket.userId = decoded.id;
      socket.userEmail = decoded.email;
      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  // Connection handler
  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(
      `✅ User connected: ${socket.userEmail} (ID: ${socket.userId})`
    );

    // Join user's personal room for targeted notifications
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.userEmail}`);
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initializeSocket first.");
  }
  return io;
};

// Socket event emitters
export const socketEvents = {
  // Emit task update to all connected clients
  taskUpdated: (taskId: number, task: any) => {
    if (io) {
      io.emit("task:updated", { taskId, task });
      console.log(`📤 Emitted task:updated for task ${taskId}`);
    }
  },

  // Emit task creation to all connected clients
  taskCreated: (task: any) => {
    if (io) {
      io.emit("task:created", { task });
      console.log(`📤 Emitted task:created for task ${task.id}`);
    }
  },

  // Emit task deletion to all connected clients
  taskDeleted: (taskId: number) => {
    if (io) {
      io.emit("task:deleted", { taskId });
      console.log(`📤 Emitted task:deleted for task ${taskId}`);
    }
  },

  // Emit notification to specific user
  notificationCreated: (userId: number, notification: any) => {
    if (io) {
      io.to(`user:${userId}`).emit("notification:created", { notification });
      console.log(`📤 Emitted notification to user ${userId}`);
    }
  },

  // Emit task assignment notification to specific user
  taskAssigned: (userId: number, task: any) => {
    if (io) {
      io.to(`user:${userId}`).emit("task:assigned", { task });
      console.log(`📤 Emitted task:assigned to user ${userId}`);
    }
  },
};
