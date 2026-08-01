import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";
import { STATUS_CODES } from "../constants/statusCodes";

/**
 * Handles requests to unknown routes.
 */
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(
    new AppError(
      `Route ${req.originalUrl} not found`,
      STATUS_CODES.NOT_FOUND
    )
  );
};