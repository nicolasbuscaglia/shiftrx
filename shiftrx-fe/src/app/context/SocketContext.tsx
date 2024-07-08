"use client";
import { getAccessToken } from "@/services/auth";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: React.MutableRefObject<Socket | undefined>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
