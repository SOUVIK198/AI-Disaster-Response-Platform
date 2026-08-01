/**
 * User Response
 */
export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string | null;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Emergency Contact
 */
export interface EmergencyContact {
  emergencyName: string;
  emergencyPhone: string;
  relationship: string;
}

/**
 * User Activity
 */
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  createdAt: Date;
}

/**
 * User Notification
 */
export interface UserNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

/**
 * Dashboard Summary
 */
export interface DashboardSummary {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  unreadNotifications: number;
}

/**
 * User Status
 */
export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "BLOCKED";