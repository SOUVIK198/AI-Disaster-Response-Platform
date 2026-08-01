import { Request, Response, NextFunction } from "express";

import * as authService from "../service/auth.service";

/**
 * Register User
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login User
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout User
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    await authService.logout(userId);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh Token
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.refreshToken(req.body);

    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current User
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await authService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot Password
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.forgotPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.resetPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change Password
 */
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    await authService.changePassword(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify Email
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.verifyEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resend Verification Email
 */
export const resendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.resendVerificationEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};