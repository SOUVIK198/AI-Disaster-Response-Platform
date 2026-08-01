/**
 * Update User Profile DTO
 */
export interface UpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  bio?: string;
}

/**
 * Upload Avatar DTO
 */
export interface UploadAvatarDTO {
  avatarUrl: string;
}

/**
 * Emergency Contact DTO
 */
export interface EmergencyContactDTO {
  emergencyName: string;
  emergencyPhone: string;
  relationship: string;
}

/**
 * Change User Status DTO
 */
export interface ChangeUserStatusDTO {
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED";
}

/**
 * Block User DTO
 */
export interface BlockUserDTO {
  reason: string;
}

/**
 * Unblock User DTO
 */
export interface UnblockUserDTO {}

/**
 * User Activity DTO
 */
export interface UserActivityDTO {
  id: string;
  action: string;
  timestamp: Date;
}

/**
 * User Notification DTO
 */
export interface UserNotificationDTO {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

/**
 * User Dashboard DTO
 */
export interface UserDashboardDTO {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  unreadNotifications: number;
}