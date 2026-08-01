import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "./env";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Generate Access Token
 */
export const generateAccessToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  } as SignOptions);
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  } as SignOptions);
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (
  token: string
): JwtPayload | TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload | TokenPayload;
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (
  token: string
): JwtPayload | TokenPayload => {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET
  ) as JwtPayload | TokenPayload;
};