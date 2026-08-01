import * as userRepository from "../repository/user.repository";

import {
  UpdateProfileDTO,
  UploadAvatarDTO,
  EmergencyContactDTO,
  ChangeUserStatusDTO,
  BlockUserDTO,
} from "../dto/user.dto";

/**
 * Get Current User Profile
 */
export const getProfile = async (userId: string) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfile = async (
  userId: string,
  data: UpdateProfileDTO
) => {
  return userRepository.update(userId, data);
};

/**
 * Upload Avatar
 */
export const uploadAvatar = async (
  userId: string,
  data: UploadAvatarDTO
) => {
  return userRepository.updateAvatar(
    userId,
    data.avatarUrl
  );
};

/**
 * Update Emergency Contact
 */
export const updateEmergencyContact = async (
  userId: string,
  data: EmergencyContactDTO
) => {
  return userRepository.updateEmergencyContact(
    userId,
    data
  );
};

/**
 * Get All Users
 */
export const getAllUsers = async () => {
  return userRepository.findAll();
};

/**
 * Get User By ID
 */
export const getUserById = async (
  id: string
) => {

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Change User Status
 */
export const updateStatus = async (
  id: string,
  data: ChangeUserStatusDTO
) => {
  return userRepository.updateStatus(
    id,
    data.status
  );
};

/**
 * Delete User
 */
export const deleteUser = async (
  id: string
) => {

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return userRepository.deleteUser(id);
};

/**
 * Get User Activity
 */
export const getUserActivity = async (
  id: string
) => {
  return userRepository.getActivity(id);
};

/**
 * Get User Notifications
 */
export const getUserNotifications = async (
  id: string
) => {
  return userRepository.getNotifications(id);
};

/**
 * Block User
 */
export const blockUser = async (
  id: string,
  data: BlockUserDTO
) => {
  return userRepository.block(
    id,
    data.reason
  );
};

/**
 * Unblock User
 */
export const unblockUser = async (
  id: string
) => {
  return userRepository.unblock(id);
};

/**
 * Dashboard Summary
 */
export const getDashboard = async (
  id: string
) => {

  const notifications =
    await userRepository.getNotifications(id);

  const incidents =
    await userRepository.getActivity(id);

  return {
    totalIncidents: incidents.length,
    activeIncidents: 0,
    resolvedIncidents: incidents.length,
    unreadNotifications: notifications.filter(
      (notification) => !notification.isRead
    ).length,
  };
};import * as userRepository from "../repository/user.repository";

import {
  UpdateProfileDTO,
  UploadAvatarDTO,
  EmergencyContactDTO,
  ChangeUserStatusDTO,
  BlockUserDTO,
} from "../dto/user.dto";

/**
 * Get Current User Profile
 */
export const getProfile = async (userId: string) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfile = async (
  userId: string,
  data: UpdateProfileDTO
) => {
  return userRepository.update(userId, data);
};

/**
 * Upload Avatar
 */
export const uploadAvatar = async (
  userId: string,
  data: UploadAvatarDTO
) => {
  return userRepository.updateAvatar(
    userId,
    data.avatarUrl
  );
};

/**
 * Update Emergency Contact
 */
export const updateEmergencyContact = async (
  userId: string,
  data: EmergencyContactDTO
) => {
  return userRepository.updateEmergencyContact(
    userId,
    data
  );
};

/**
 * Get All Users
 */
export const getAllUsers = async () => {
  return userRepository.findAll();
};

/**
 * Get User By ID
 */
export const getUserById = async (
  id: string
) => {

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Change User Status
 */
export const updateStatus = async (
  id: string,
  data: ChangeUserStatusDTO
) => {
  return userRepository.updateStatus(
    id,
    data.status
  );
};

/**
 * Delete User
 */
export const deleteUser = async (
  id: string
) => {

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return userRepository.deleteUser(id);
};

/**
 * Get User Activity
 */
export const getUserActivity = async (
  id: string
) => {
  return userRepository.getActivity(id);
};

/**
 * Get User Notifications
 */
export const getUserNotifications = async (
  id: string
) => {
  return userRepository.getNotifications(id);
};

/**
 * Block User
 */
export const blockUser = async (
  id: string,
  data: BlockUserDTO
) => {
  return userRepository.block(
    id,
    data.reason
  );
};

/**
 * Unblock User
 */
export const unblockUser = async (
  id: string
) => {
  return userRepository.unblock(id);
};

/**
 * Dashboard Summary
 */
export const getDashboard = async (
  id: string
) => {

  const notifications =
    await userRepository.getNotifications(id);

  const incidents =
    await userRepository.getActivity(id);

  return {
    totalIncidents: incidents.length,
    activeIncidents: 0,
    resolvedIncidents: incidents.length,
    unreadNotifications: notifications.filter(
      (notification) => !notification.isRead
    ).length,
  };
};