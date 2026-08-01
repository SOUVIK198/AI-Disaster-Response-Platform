import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import logger from "./logger";

let io: Server;

/**
 * Initialize Socket.IO
 */
export const initializeSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Client Connected: ${socket.id}`);

    /**
     * Join Room
     */
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      logger.info(`${socket.id} joined room ${roomId}`);
    });

    /**
     * Leave Room
     */
    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      logger.info(`${socket.id} left room ${roomId}`);
    });

    /**
     * Disconnect
     */
    socket.on("disconnect", () => {
      logger.info(`Client Disconnected: ${socket.id}`);
    });
  });

  logger.info("✅ Socket.IO initialized.");

  return io;
};

/**
 * Get Socket.IO Instance
 */
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
};
