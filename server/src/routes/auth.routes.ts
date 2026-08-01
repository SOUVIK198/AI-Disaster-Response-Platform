import { Router } from "express";

import * as authController from "./auth.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";
import { authLimiter } from "../../common/middleware/rateLimit.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  refreshTokenSchema,
  verifyEmailSchema,
  resendVerificationSchema,
} from "./validation/auth.validation";

const router = Router();

/**
 * Register
 */
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  authController.register
);

/**
 * Login
 */
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  authController.login
);

/**
 * Logout
 */
router.post(
  "/logout",
  authenticate,
  authController.logout
);

/**
 * Refresh Access Token
 */
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken
);

/**
 * Verify Email
 */
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyEmail
);

/**
 * Resend Verification Email
 */
router.post(
  "/resend-verification",
  authLimiter,
  validate(resendVerificationSchema),
  authController.resendVerificationEmail
);

/**
 * Forgot Password
 */
router.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

/**
 * Reset Password
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);

/**
 * Change Password
 */
router.put(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

/**
 * Get Current User
 */
router.get(
  "/me",
  authenticate,
  authController.getCurrentUser
);

/**
 * Admin - Get All Sessions
 */
router.get(
  "/sessions",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  authController.getSessions
);

/**
 * Admin - Revoke Session
 */
router.delete(
  "/sessions/:sessionId",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  authController.revokeSession
);

export default router;