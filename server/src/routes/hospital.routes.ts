import { Router } from "express";

import * as hospitalController from "./hospital.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  createHospitalSchema,
  updateHospitalSchema,
  updateBedAvailabilitySchema,
  updateAmbulanceStatusSchema,
} from "./validation/hospital.validation";

const router = Router();

/**
 * Create Hospital
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createHospitalSchema),
  hospitalController.createHospital
);

/**
 * Get All Hospitals
 */
router.get(
  "/",
  authenticate,
  hospitalController.getAllHospitals
);

/**
 * Get Hospital By ID
 */
router.get(
  "/:id",
  authenticate,
  hospitalController.getHospitalById
);

/**
 * Update Hospital
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.HOSPITAL),
  validate(updateHospitalSchema),
  hospitalController.updateHospital
);

/**
 * Delete Hospital
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  hospitalController.deleteHospital
);

/**
 * Update Bed Availability
 */
router.patch(
  "/:id/beds",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.HOSPITAL),
  validate(updateBedAvailabilitySchema),
  hospitalController.updateBedAvailability
);

/**
 * Update Ambulance Status
 */
router.patch(
  "/:id/ambulances",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.HOSPITAL),
  validate(updateAmbulanceStatusSchema),
  hospitalController.updateAmbulanceStatus
);

/**
 * Nearby Hospitals
 */
router.get(
  "/nearby",
  authenticate,
  hospitalController.getNearbyHospitals
);

/**
 * Available Hospitals
 */
router.get(
  "/available",
  authenticate,
  hospitalController.getAvailableHospitals
);

/**
 * Hospital Dashboard
 */
router.get(
  "/dashboard/summary",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.HOSPITAL),
  hospitalController.getDashboard
);

export default router;