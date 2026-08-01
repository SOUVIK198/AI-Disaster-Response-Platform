import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple PrismaClient instances during development
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

/**
 * Connect to PostgreSQL
 */
export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

/**
 * Disconnect from PostgreSQL
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log("🔌 Database disconnected.");
  } catch (error) {
    console.error("❌ Error disconnecting database:", error);
  }
};

export default prisma;