import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

import AppError from "../errors/AppError";
import { STATUS_CODES } from "../constants/statusCodes";

/**
 * Request Validation Middleware
 */
export const validate = (schema: AnyZodObject) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError(
            error.errors[0].message,
            STATUS_CODES.BAD_REQUEST
          )
        );
      }

      next(error);
    }
  };
};