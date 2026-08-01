import { Router } from "express";

import * as ngoController from "./ngo.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  createNGOSchema,
  updateNGOSchema,
  assignIncidentSchema,
  updateResourceSchema,
} from "./validation/ngo.validation";

const router = Router();

/**
 * Create NGO
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createNGOSchema),
  ngoController.createNGO
);

/**
 * Get All NGOs
 */
router.get(
  "/",
  authenticate,
  ngoController.getAllNGOs
);

/**
 * Get NGO By ID
 */
router.get(
  "/:id",
  authenticate,
  ngoController.getNGOById
);

/**
 * Update NGO
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.NGO),
  validate(updateNGOSchema),
  ngoController.updateNGO
);

/**
 * Delete NGO
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  ngoController.deleteNGO
);

/**
 * Assign NGO to Incident
 */
router.patch(
  "/:id/assign-incident",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.DISPATCHER),
  validate(assignIncidentSchema),
  ngoController.assignIncident
);

/**
 * Update NGO Resources
 */
router.patch(
  "/:id/resources",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.NGO),
  validate(updateResourceSchema),
  ngoController.updateResources
);

/**
 * Available NGOs
 */
router.get(
  "/available",
  authenticate,
  ngoController.getAvailableNGOs
);

/**
 * Nearby NGOs
 */
router.get(
  "/nearby",
  authenticate,
  ngoController.getNearbyNGOs
);

/**
 * NGO Dashboard
 */
router.get(
  "/dashboard/summary",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.NGO),
  ngoController.getDashboard
);

/**
 * NGO Active Incidents
 */
router.get(
  "/:id/incidents",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.NGO),
  ngoController.getAssignedIncidents
);

/**
 * NGO Volunteers
 */
router.get(
  "/:id/volunteers",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.NGO),
  ngoController.getNGOVolunteers
);

/**
 * NGO Resource History
 */
router.get(
  "/:id/resources/history",
  authenticate,
 authorize(ROLES.ADMIN, ROLES.NGO),
  ngoController.getResourceHistory
);

export default router;