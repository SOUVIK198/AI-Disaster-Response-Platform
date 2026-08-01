export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: "USER" | "VOLUNTEER" | "NGO" | "HOSPITAL";
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface VerifyEmailDTO {
  token: string;
}

export interface ResendVerificationDTO {
  email: string;
}