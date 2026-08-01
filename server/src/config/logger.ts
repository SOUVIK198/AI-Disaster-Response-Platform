import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

/**
 * Custom Log Format
 */
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

/**
 * Logger Configuration
 */
const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),

  transports: [
    /**
     * Console Logs
     */
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
      ),
    }),

    /**
     * Error Logs
     */
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    /**
     * All Logs
     */
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;