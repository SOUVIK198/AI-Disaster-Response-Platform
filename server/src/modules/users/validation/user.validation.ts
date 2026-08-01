import { z } from "zod";

/**
 * Update User Profile
 */
export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50)
      .optional(),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50)
      .optional(),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15)
      .optional(),

    address: z
      .string()
      .max(255)
      .optional(),

    city: z
      .string()
      .max(100)
      .optional(),

    state: z
      .string()
      .max(100)
      .optional(),

    country: z
      .string()
      .max(100)
      .optional(),

    pincode: z
      .string()
      .max(10)
      .optional(),

    bio: z
      .string()
      .max(500)
      .optional(),
  }),
});

/**
 * Upload Avatar
 */
export const uploadAvatarSchema = z.object({
  body: z.object({}),
});

/**
 * Emergency Contact
 */
export const updateEmergencyContactSchema = z.object({
  body: z.object({
    emergencyName: z
      .string()
      .min(2)
      .max(100),

    emergencyPhone: z
      .string()
      .min(10)
      .max(15),

    relationship: z
      .string()
      .min(2)
      .max(50),
  }),
});

/**
 * Change User Status
 */
export const changeUserStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "ACTIVE",
      "INACTIVE",
      "SUSPENDED",
      "BLOCKED",
    ]),
  }),
});

/**
 * Block User
 */
export const blockUserSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .min(5)
      .max(300),
  }),
});

/**
 * Unblock User
 */
export const unblockUserSchema = z.object({
  body: z.object({}),
});