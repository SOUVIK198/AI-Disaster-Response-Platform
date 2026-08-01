import { Router } from "express";

import * as volunteerController from "./volunteer.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  createVolunteerSchema,
  updateVolunteerSchema,
  updateAvailabilitySchema,
  assignIncidentSchema,
} from "./validation/volunteer.validation";

const router = Router();

/**
 * Register Volunteer
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createVolunteerSchema),
  volunteerController.createVolunteer
);

/**
 * Get All Volunteers
 */
router.get(
  "/",
  authenticate,
  volunteerController.getAllVolunteers
);

/**
 * Get Volunteer By ID
 */
router.get(
  "/:id",
  authenticate,
  volunteerController.getVolunteerById
);

/**
 * Update Volunteer
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  validate(updateVolunteerSchema),
  volunteerController.updateVolunteer
);

/**
 * Delete Volunteer
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  volunteerController.deleteVolunteer
);

/**
 * Update Availability
 */
router.patch(
  "/:id/availability",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  validate(updateAvailabilitySchema),
  volunteerController.updateAvailability
);

/**
 * Assign Volunteer to Incident
 */
router.patch(
  "/:id/assign-incident",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.DISPATCHER),
  validate(assignIncidentSchema),
  volunteerController.assignIncident
);

/**
 * Get Nearby Volunteers
 */
router.get(
  "/nearby",
  authenticate,
  volunteerController.getNearbyVolunteers
);

/**
 * Get Available Volunteers
 */
router.get(
  "/available",
  authenticate,
  volunteerController.getAvailableVolunteers
);

/**
 * Get Volunteer Dashboard
 */
router.get(
  "/dashboard/summary",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  volunteerController.getDashboard
);

/**
 * Get Assigned Incidents
 */
router.get(
  "/:id/incidents",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  volunteerController.getAssignedIncidents
);

/**
 * Complete Incident
 */
router.patch(
  "/:id/complete-incident",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  volunteerController.completeIncident
);

/**
 * Get Volunteer Statistics
 */
router.get(
  "/:id/statistics",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.VOLUNTEER),
  volunteerController.getStatistics
);

export default router;