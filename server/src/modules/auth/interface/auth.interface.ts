import {
  RegisterDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO,
  RefreshTokenDTO,
  VerifyEmailDTO,
  ResendVerificationDTO,
} from "../dto/auth.dto";

/**
 * Authentication Service Interface
 */
export interface IAuthService {
  register(data: RegisterDTO): Promise<any>;

  login(data: LoginDTO): Promise<any>;

  logout(userId: string): Promise<void>;

  refreshToken(data: RefreshTokenDTO): Promise<any>;

  forgotPassword(data: ForgotPasswordDTO): Promise<void>;

  resetPassword(data: ResetPasswordDTO): Promise<void>;

  changePassword(
    userId: string,
    data: ChangePasswordDTO
  ): Promise<void>;

  verifyEmail(data: VerifyEmailDTO): Promise<void>;

  resendVerificationEmail(
    data: ResendVerificationDTO
  ): Promise<void>;

  getCurrentUser(userId: string): Promise<any>;
}

/**
 * Authentication Repository Interface
 */
export interface IAuthRepository {
  createUser(data: RegisterDTO): Promise<any>;

  findUserByEmail(email: string): Promise<any>;

  findUserById(id: string): Promise<any>;

  updatePassword(
    userId: string,
    hashedPassword: string
  ): Promise<void>;

  saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void>;

  removeRefreshToken(userId: string): Promise<void>;

  verifyEmail(userId: string): Promise<void>;
}import {
  RegisterDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO,
  RefreshTokenDTO,
  VerifyEmailDTO,
  ResendVerificationDTO,
} from "../dto/auth.dto";

/**
 * Authentication Service Interface
 */
export interface IAuthService {
  register(data: RegisterDTO): Promise<any>;

  login(data: LoginDTO): Promise<any>;

  logout(userId: string): Promise<void>;

  refreshToken(data: RefreshTokenDTO): Promise<any>;

  forgotPassword(data: ForgotPasswordDTO): Promise<void>;

  resetPassword(data: ResetPasswordDTO): Promise<void>;

  changePassword(
    userId: string,
    data: ChangePasswordDTO
  ): Promise<void>;

  verifyEmail(data: VerifyEmailDTO): Promise<void>;

  resendVerificationEmail(
    data: ResendVerificationDTO
  ): Promise<void>;

  getCurrentUser(userId: string): Promise<any>;
}

/**
 * Authentication Repository Interface
 */
export interface IAuthRepository {
  createUser(data: RegisterDTO): Promise<any>;

  findUserByEmail(email: string): Promise<any>;

  findUserById(id: string): Promise<any>;

  updatePassword(
    userId: string,
    hashedPassword: string
  ): Promise<void>;

  saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void>;

  removeRefreshToken(userId: string): Promise<void>;

  verifyEmail(userId: string): Promise<void>;
}