import { PrismaClient, User } from "@prisma/client";

import {
  RegisterDTO,
} from "../dto/auth.dto";

const prisma = new PrismaClient();

/**
 * Create User
 */
export const createUser = async (
  data: RegisterDTO,
  hashedPassword: string
): Promise<User> => {

  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: data.role ?? "USER",
    },
  });

};

/**
 * Find User By Email
 */
export const findUserByEmail = async (
  email: string
): Promise<User | null> => {

  return prisma.user.findUnique({
    where: {
      email,
    },
  });

};

/**
 * Find User By ID
 */
export const findUserById = async (
  id: string
): Promise<User | null> => {

  return prisma.user.findUnique({
    where: {
      id,
    },
  });

};

/**
 * Save Refresh Token
 */
export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<User> => {

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
    },
  });

};

/**
 * Remove Refresh Token
 */
export const removeRefreshToken = async (
  userId: string
): Promise<User> => {

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });

};

/**
 * Update Password
 */
export const updatePassword = async (
  userId: string,
  hashedPassword: string
): Promise<User> => {

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

};

/**
 * Verify Email
 */
export const verifyEmail = async (
  userId: string
): Promise<User> => {

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified: true,
    },
  });

};