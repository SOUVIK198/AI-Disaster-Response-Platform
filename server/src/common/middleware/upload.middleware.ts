import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

import AppError from "../errors/AppError";
import { STATUS_CODES } from "../constants/statusCodes";

/**
 * Store files temporarily in memory.
 * Files will later be uploaded to Cloudinary.
 */
const storage = multer.memoryStorage();

/**
 * Allowed MIME Types
 */
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "application/pdf",
];

/**
 * File Filter
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new AppError(
        "Only JPG, PNG, WEBP and PDF files are allowed.",
        STATUS_CODES.BAD_REQUEST
      )
    );
  }
};

/**
 * Multer Configuration
 */
export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});