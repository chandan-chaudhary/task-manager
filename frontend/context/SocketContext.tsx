"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket, disconnectSocket } from "@/lib/socket";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
  token?: string;
}

export function SocketProvider({ children, token }: SocketProviderProps) {
  const [state, setState] = useState<SocketContextType>({
    socket: null,
    isConnected: false,
  });

  useEffect(() => {
    // Only initialize socket if we have a token (user is authenticated)
    if (!token) {
      disconnectSocket();
      return;
    }

    const socketInstance = initializeSocket(token);

    // Listen to connection status
    const handleConnect = () => {
      setState({ socket: socketInstance, isConnected: true });
    };

    const handleDisconnect = () => {
      setState({ socket: socketInstance, isConnected: false });
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);

    // Cleanup on unmount
    return () => {
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      disconnectSocket();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={state}>{children}</SocketContext.Provider>
  );
}
