"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import cookie from "@/services/cookie";
import { useUser } from "@/context/auth-context";
import { useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "@/queries/query-keys";
import { toast } from "sonner";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const authUser = cookie.get("auth-user");
    const token = user?.access_token || authUser?.access_token;

    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
        ? process.env.NEXT_PUBLIC_API_URL_LOCAL
        : process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          ? process.env.NEXT_PUBLIC_RENDER_API_URL
          : process.env.NEXT_PUBLIC_API_URL;

    if (!socketUrl) {
      console.warn("Socket URL is not defined");
      return;
    }

    const newSocket = io(socketUrl, {
      auth: {
        token: `Bearer ${token}`,
      },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    const notificationSound = new Audio("/sounds/notification-sound.mp3");

    newSocket.on("notification", (data) => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      notificationSound.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
      toast.info(data.title || "New Notification", {
        position: "top-center",
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [queryClient, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
