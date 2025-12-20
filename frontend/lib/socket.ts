import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (token: string): Socket => {
  if (socket?.connected) {
    return socket;
  }

  const SOCKET_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  // Connection event handlers
  socket.on("connect", () => {
    console.log("✅ Socket.io connected");
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket.io disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.io connection error:", error.message);
  });

  socket.on("error", (error) => {
    console.error("Socket.io error:", error);
  });

  return socket;
};


export const getSocket = (): Socket | null => {
  return socket;
};


export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket.io disconnected manually");
  }
};

export const socketEvents = {
  // Task events
  onTaskCreated: (callback: (data: { task: unknown }) => void) => {
    socket?.on("task:created", callback);
  },

  onTaskUpdated: (
    callback: (data: { taskId: number; task: unknown }) => void
  ) => {
    socket?.on("task:updated", callback);
  },

  onTaskDeleted: (callback: (data: { taskId: number }) => void) => {
    socket?.on("task:deleted", callback);
  },

  onTaskAssigned: (callback: (data: { task: unknown }) => void) => {
    socket?.on("task:assigned", callback);
  },

  // Notification events
  onNotificationCreated: (
    callback: (data: { notification: unknown }) => void
  ) => {
    socket?.on("notification:created", callback);
  },

  off: (event: string) => {
    socket?.off(event);
  },

  offAll: () => {
    socket?.removeAllListeners();
  },
};
