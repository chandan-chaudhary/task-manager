import { createServer } from "http";
import app from "./app";
import prisma from "./config/database";
import { initializeSocket } from "./config/socket";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Create HTTP server
    const httpServer = createServer(app);

    // Initialize Socket.io
    initializeSocket(httpServer);
    console.log("✅ Socket.io initialized");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔌 Socket.io is ready for connections`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
