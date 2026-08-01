import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";

/**
 * HTTP Request Logger Middleware
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    logger.info(
      `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration} ms | IP: ${req.ip}`
    );
  });

  next();
};