import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import prisma from "../../config/database";
import { env } from "../../config/env";
import AppError from "../errors/AppError";
import { STATUS_CODES } from "../constants/statusCodes";

/**
 * Extend Express Request
 */
export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Authentication Middleware
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    /**
     * Get Token from Authorization Header
     * Authorization: Bearer <token>
     */
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    /**
     * No Token
     */
    if (!token) {
      return next(
        new AppError(
          "Authentication required",
          STATUS_CODES.UNAUTHORIZED
        )
      );
    }

    /**
     * Verify JWT
     */
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as {
      id: string;
    };

    /**
     * Find User
     */
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    /**
     * User Not Found
     */
    if (!user) {
      return next(
        new AppError(
          "User not found",
          STATUS_CODES.UNAUTHORIZED
        )
      );
    }

    /**
     * Attach User
     */
    req.user = user;

    next();
  } catch (error) {
    next(
      new AppError(
        "Invalid or expired token",
        STATUS_CODES.UNAUTHORIZED
      )
    );
  }
};