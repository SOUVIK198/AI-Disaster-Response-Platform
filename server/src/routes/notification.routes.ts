import { Router } from "express";

import * as notificationController from "./notification.controller";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validation.middleware";

import { ROLES } from "../../common/constants/roles";

import {
  sendNotificationSchema,
  sendEmailSchema,
  sendPushNotificationSchema,
  markAsReadSchema,
} from "./validation/notification.validation";

const router = Router();

/**
 * Send Notification
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(sendNotificationSchema),
  notificationController.sendNotification
);

/**
 * Get My Notifications
 */
router.get(
  "/",
  authenticate,
  notificationController.getMyNotifications
);

/**
 * Get Notification By ID
 */
router.get(
  "/:id",
  authenticate,
  notificationController.getNotificationById
);

/**
 * Mark Notification As Read
 */
router.patch(
  "/:id/read",
  authenticate,
  validate(markAsReadSchema),
  notificationController.markAsRead
);

/**
 * Mark All Notifications As Read
 */
router.patch(
  "/read-all",
  authenticate,
  notificationController.markAllAsRead
);

/**
 * Delete Notification
 */
router.delete(
  "/:id",
  authenticate,
  notificationController.deleteNotification
);

/**
 * Send Email
 */
router.post(
  "/email",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(sendEmailSchema),
  notificationController.sendEmail
);

/**
 * Send Push Notification
 */
router.post(
  "/push",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(sendPushNotificationSchema),
  notificationController.sendPushNotification
);

/**
 * Broadcast Emergency Alert
 */
router.post(
  "/broadcast",
  authenticate,
  authorize(ROLES.ADMIN),
  notificationController.broadcastAlert
);

/**
 * Notification Dashboard
 */
router.get(
  "/dashboard/summary",
  authenticate,
  authorize(ROLES.ADMIN),
  notificationController.getDashboard
);

export default router;