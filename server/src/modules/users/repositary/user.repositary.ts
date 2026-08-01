import {
  UpdateProfileDTO,
  UploadAvatarDTO,
  EmergencyContactDTO,
  ChangeUserStatusDTO,
  BlockUserDTO,
  UserActivityDTO,
  UserNotificationDTO,
  UserDashboardDTO,
} from "../dto/user.dto";

/**
 * User Service Interface
 */
export interface IUserService {
  getProfile(userId: string): Promise<any>;

  updateProfile(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<any>;

  uploadAvatar(
    userId: string,
    data: UploadAvatarDTO
  ): Promise<any>;

  updateEmergencyContact(
    userId: string,
    data: EmergencyContactDTO
  ): Promise<any>;

  getAllUsers(): Promise<any[]>;

  getUserById(id: string): Promise<any>;

  updateStatus(
    id: string,
    data: ChangeUserStatusDTO
  ): Promise<any>;

  deleteUser(id: string): Promise<void>;

  getUserActivity(
    id: string
  ): Promise<UserActivityDTO[]>;

  getUserNotifications(
    id: string
  ): Promise<UserNotificationDTO[]>;

  blockUser(
    id: string,
    data: BlockUserDTO
  ): Promise<any>;

  unblockUser(id: string): Promise<any>;

  getDashboard(
    id: string
  ): Promise<UserDashboardDTO>;
}

/**
 * User Repository Interface
 */
export interface IUserRepository {
  findById(id: string): Promise<any>;

  findAll(): Promise<any[]>;

  update(
    id: string,
    data: Partial<UpdateProfileDTO>
  ): Promise<any>;

  delete(id: string): Promise<void>;

  updateStatus(
    id: string,
    status: string
  ): Promise<any>;

  updateAvatar(
    id: string,
    avatarUrl: string
  ): Promise<any>;

  updateEmergencyContact(
    id: string,
    data: EmergencyContactDTO
  ): Promise<any>;

  getActivity(
    id: string
  ): Promise<UserActivityDTO[]>;

  getNotifications(
    id: string
  ): Promise<UserNotificationDTO[]>;

  block(
    id: string,
    reason: string
  ): Promise<any>;

  unblock(id: string): Promise<any>;
}