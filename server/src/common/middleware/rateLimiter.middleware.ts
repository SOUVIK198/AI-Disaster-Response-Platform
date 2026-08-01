import rateLimit from "express-rate-limit";

/**
 * General API Rate Limiter
 * 100 requests / 15 minutes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

/**
 * Authentication Rate Limiter
 * Protects Login & Register APIs
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again after 15 minutes.",
  },
});

/**
 * OTP Rate Limiter
 */
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,

  max: 3,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many OTP requests. Please try again later.",
  },
});

/**
 * AI Endpoint Limiter
 * AI APIs are expensive.
 */
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,

  max: 20,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "AI request limit exceeded. Please wait.",
  },
});