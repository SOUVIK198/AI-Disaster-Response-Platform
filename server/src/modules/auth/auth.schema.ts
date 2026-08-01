/**
 * JWT Access Token Payload
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Refresh Token Payload
 */
export interface RefreshTokenPayload {
  userId: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
}

/**
 * Email Verification Token
 */
export interface EmailVerificationToken {
  token: string;
}

/**
 * Password Reset Token
 */
export interface PasswordResetToken {
  token: string;
}