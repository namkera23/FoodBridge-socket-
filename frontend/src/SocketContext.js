// SocketContext.js
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export const SocketContext = createContext(socket);
