import { z } from "zod";

/**
 * Create Incident
 */
export const createIncidentSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000),

    disasterType: z.enum([
      "FLOOD",
      "EARTHQUAKE",
      "FIRE",
      "LANDSLIDE",
      "CYCLONE",
      "ACCIDENT",
      "OTHER",
    ]),

    severity: z.enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]),

    latitude: z.number(),

    longitude: z.number(),

    address: z.string().min(5),

    city: z.string(),

    state: z.string(),

    country: z.string(),

    pincode: z.string().optional(),
  }),
});

/**
 * Update Incident
 */
export const updateIncidentSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(100).optional(),

    description: z.string().min(10).max(1000).optional(),

    severity: z
      .enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
      .optional(),

    address: z.string().optional(),

    city: z.string().optional(),

    state: z.string().optional(),

    country: z.string().optional(),
  }),
});

/**
 * Update Incident Status
 */
export const updateIncidentStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "REPORTED",
      "IN_PROGRESS",
      "RESOLVED",
      "CANCELLED",
    ]),
  }),
});

/**
 * Assign Volunteer
 */
export const assignVolunteerSchema = z.object({
  body: z.object({
    volunteerId: z.string().uuid(),
  }),
});

/**
 * Upload Images
 */
export const uploadIncidentImageSchema = z.object({
  body: z.object({}),
});

/**
 * Nearby Search
 */
export const nearbyIncidentSchema = z.object({
  query: z.object({
    latitude: z.coerce.number(),

    longitude: z.coerce.number(),

    radius: z.coerce.number().default(10),
  }),
});

/**
 * Filter Incidents
 */
export const incidentFilterSchema = z.object({
  query: z.object({
    disasterType: z.string().optional(),

    severity: z.string().optional(),

    status: z.string().optional(),

    city: z.string().optional(),

    page: z.coerce.number().default(1),

    limit: z.coerce.number().default(10),
  }),
});