import { Request, Response, NextFunction } from "express";

import * as userService from "../service/user.service";

/**
 * Get Current User Profile
 */
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await userService.getProfile(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Profile
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await userService.updateProfile(
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Avatar
 */
export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const avatarUrl = req.file?.path || "";

    const user = await userService.uploadAvatar(userId, {
      avatarUrl,
    });

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Emergency Contact
 */
export const updateEmergencyContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user =
      await userService.updateEmergencyContact(
        userId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Emergency contact updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Users
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get User By ID
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update User Status
 */
export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.updateStatus(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete User
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get User Activity
 */
export const getUserActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity =
      await userService.getUserActivity(req.params.id);

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get User Notifications
 */
export const getUserNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications =
      await userService.getUserNotifications(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Block User
 */
export const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.blockUser(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unblock User
 */
export const unblockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user =
      await userService.unblockUser(req.params.id);

    res.status(200).json({
      success: true,
      message: "User unblocked successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Dashboard Summary
 */
export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboard =
      await userService.getDashboard(req.params.id);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};