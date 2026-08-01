import { Router } from "express";

import * as shelterController from "./shelter.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  createShelterSchema,
  updateShelterSchema,
  updateCapacitySchema,
  assignVictimSchema,
} from "./validation/shelter.validation";

const router = Router();

/**
 * Create Shelter
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createShelterSchema),
  shelterController.createShelter
);

/**
 * Get All Shelters
 */
router.get(
  "/",
  authenticate,
  shelterController.getAllShelters
);

/**
 * Get Shelter By ID
 */
router.get(
  "/:id",
  authenticate,
  shelterController.getShelterById
);

/**
 * Update Shelter
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SHELTER),
  validate(updateShelterSchema),
  shelterController.updateShelter
);

/**
 * Delete Shelter
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  shelterController.deleteShelter
);

/**
 * Update Shelter Capacity
 */
router.patch(
  "/:id/capacity",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SHELTER),
  validate(updateCapacitySchema),
  shelterController.updateCapacity
);

/**
 * Assign Victim to Shelter
 */
router.patch(
  "/:id/assign-victim",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.DISPATCHER,
    ROLES.SHELTER
  ),
  validate(assignVictimSchema),
  shelterController.assignVictim
);

/**
 * Get Nearby Shelters
 */
router.get(
  "/nearby",
  authenticate,
  shelterController.getNearbyShelters
);

/**
 * Get Available Shelters
 */
router.get(
  "/available",
  authenticate,
  shelterController.getAvailableShelters
);

/**
 * Shelter Dashboard
 */
router.get(
  "/dashboard/summary",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SHELTER),
  shelterController.getDashboard
);

/**
 * Shelter Resources
 */
router.get(
  "/:id/resources",
  authenticate,
  shelterController.getShelterResources
);

/**
 * Update Shelter Resources
 */
router.patch(
  "/:id/resources",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SHELTER),
  shelterController.updateResources
);

/**
 * Get Shelter Occupancy
 */
router.get(
  "/:id/occupancy",
  authenticate,
  shelterController.getOccupancy
);

export default router;