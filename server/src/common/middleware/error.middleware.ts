import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";
import { STATUS_CODES } from "../constants/statusCodes";
import logger from "../../config/logger";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;

  /**
   * Handle Unknown Errors
   */
  if (!(error instanceof AppError)) {
    logger.error(error.message);

    error = new AppError(
      "Internal Server Error",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }

  /**
   * Log Error
   */
  logger.error(
    `${req.method} ${req.originalUrl} - ${error.message}`
  );

  /**
   * Send Error Response
   */
  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
    stack:
      process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });
};