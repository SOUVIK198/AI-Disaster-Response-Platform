import { z } from "zod";

/**
 * Register Validation
 */
export const registerSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(/[@$!%*?&]/, "Must contain one special character"),

    phone: z
      .string()
      .min(10)
      .max(15),

    role: z.enum([
      "USER",
      "VOLUNTEER",
      "NGO",
      "HOSPITAL"
    ]).optional()
  })
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email(),

    password: z
      .string()
      .min(8)
  })
});

/**
 * Forgot Password
 */
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email()
  })
});

/**
 * Reset Password
 */
export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),

    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[@$!%*?&]/)
  })
});

/**
 * Change Password
 */
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string(),

    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[@$!%*?&]/)
  })
});

/**
 * Refresh Token
 */
export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string()
  })
});

/**
 * Verify Email
 */
export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string()
  })
});

/**
 * Resend Verification Email
 */
export const resendVerificationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email()
  })
});