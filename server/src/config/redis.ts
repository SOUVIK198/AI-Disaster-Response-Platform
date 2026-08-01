import { createClient } from "redis";
import { env } from "./env";

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log(" Redis connected successfully.");
});

redisClient.on("error", (error) => {
  console.error(" Redis connection error:", error);
});

redisClient.on("end", () => {
  console.log(" Redis connection closed.");
});

/**
 * Connect to Redis
 */
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
};

/**
 * Disconnect Redis
 */
export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.quit();
    console.log("✅ Redis disconnected.");
  } catch (error) {
    console.error("❌ Error disconnecting Redis:", error);
  }
};

export default redisClient;