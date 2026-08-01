import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repository/auth.repository";

import {
  RegisterDTO,
  LoginDTO,
  RefreshTokenDTO,
} from "../dto/auth.dto";

/**
 * Register User
 */
export const register = async (
  data: RegisterDTO
) => {

  const existingUser =
    await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await authRepository.createUser(
    data,
    hashedPassword
  );

  return user;
};

/**
 * Login User
 */
export const login = async (
  data: LoginDTO
) => {

  const user =
    await authRepository.findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid =
    await bcrypt.compare(
      data.password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  await authRepository.saveRefreshToken(
    user.id,
    refreshToken
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/**
 * Logout
 */
export const logout = async (
  userId: string
) => {

  await authRepository.removeRefreshToken(
    userId
  );

};

/**
 * Refresh Token
 */
export const refreshToken = async (
  data: RefreshTokenDTO
) => {

  const payload = jwt.verify(
    data.refreshToken,
    process.env.JWT_REFRESH_SECRET!
  ) as any;

  const user =
    await authRepository.findUserById(
      payload.userId
    );

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
  };
};

/**
 * Get Current User
 */
export const getCurrentUser = async (
  userId: string
) => {

  return authRepository.findUserById(userId);

};