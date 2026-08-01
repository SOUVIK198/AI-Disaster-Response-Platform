import { Router } from "express";

import * as analyticsController from "./analytics.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  dashboardAnalyticsSchema,
  incidentAnalyticsSchema,
  volunteerAnalyticsSchema,
  shelterAnalyticsSchema,
} from "./validation/analytics.validation";

const router = Router();

/**
 * Dashboard Overview
 */
router.get(
  "/dashboard",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate(dashboardAnalyticsSchema),
  analyticsController.dashboard
);

/**
 * Incident Analytics
 */
router.get(
  "/incidents",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate(incidentAnalyticsSchema),
  analyticsController.incidentAnalytics
);

/**
 * Volunteer Analytics
 */
router.get(
  "/volunteers",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate(volunteerAnalyticsSchema),
  analyticsController.volunteerAnalytics
);

/**
 * Shelter Analytics
 */
router.get(
  "/shelters",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate(shelterAnalyticsSchema),
  analyticsController.shelterAnalytics
);

/**
 * Hospital Analytics
 */
router.get(
  "/hospitals",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.hospitalAnalytics
);

/**
 * NGO Analytics
 */
router.get(
  "/ngos",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.ngoAnalytics
);

/**
 * Resource Analytics
 */
router.get(
  "/resources",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.resourceAnalytics
);

/**
 * Disaster Trend Analytics
 */
router.get(
  "/disaster-trends",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.disasterTrendAnalytics
);

/**
 * AI Prediction Analytics
 */
router.get(
  "/ai-predictions",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.aiPredictionAnalytics
);

/**
 * Export Analytics Report
 */
router.get(
  "/export",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  analyticsController.exportReport
);

export default router;