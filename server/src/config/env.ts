import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "PORT",
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "REDIS_URL",
  "GEMINI_API_KEY",
] as const;

// Validate required environment variables
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT),

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  REDIS_URL: process.env.REDIS_URL!,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,

  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    API_KEY: process.env.CLOUDINARY_API_KEY || "",
    API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  },

  SMTP: {
    HOST: process.env.SMTP_HOST || "",
    PORT: Number(process.env.SMTP_PORT) || 587,
    USER: process.env.SMTP_USER || "",
    PASS: process.env.SMTP_PASS || "",
  },
};