/**
 * ------------------------------------------------------------------
 * File: notification.routes.ts
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import notificationController
from "./notification.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    sendNotificationSchema,

    bulkNotificationSchema,

    broadcastSchema,

    emergencySchema,

    recommendChannelSchema

} from "./notification.validation";

const router = Router();










/**
 * ----------------------------------------------------------
 * Send Notification
 * POST /notifications
 * ----------------------------------------------------------
 */
router.post(

    "/",

    authMiddleware,

    validate(
        sendNotificationSchema
    ),

    notificationController.sendNotification

);










/**
 * ----------------------------------------------------------
 * Bulk Notifications
 * POST /notifications/bulk
 * ----------------------------------------------------------
 */
router.post(

    "/bulk",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        bulkNotificationSchema
    ),

    notificationController.sendBulkNotifications

);










/**
 * ----------------------------------------------------------
 * Broadcast Notification
 * POST /notifications/broadcast
 * ----------------------------------------------------------
 */
router.post(

    "/broadcast",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        broadcastSchema
    ),

    notificationController.sendBroadcast

);










/**
 * ----------------------------------------------------------
 * Emergency Alert
 * POST /notifications/emergency
 * ----------------------------------------------------------
 */
router.post(

    "/emergency",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "DISASTER_MANAGER"
    ),

    validate(
        emergencySchema
    ),

    notificationController.sendEmergencyAlert

);










/**
 * ----------------------------------------------------------
 * Retry Failed Notifications
 * POST /notifications/retry
 * ----------------------------------------------------------
 */
router.post(

    "/retry",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    notificationController.retryFailedNotifications

);










/**
 * ----------------------------------------------------------
 * Process Scheduled Notifications
 * POST /notifications/process-scheduled
 * ----------------------------------------------------------
 */
router.post(

    "/process-scheduled",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    notificationController.processScheduledNotifications

);
/**
 * ------------------------------------------------------------------
 * File: notification.routes.ts
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import notificationController
from "./notification.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    sendNotificationSchema,

    bulkNotificationSchema,

    broadcastSchema,

    emergencySchema,

    recommendChannelSchema

} from "./notification.validation";

const router = Router();










/**
 * ----------------------------------------------------------
 * Send Notification
 * POST /notifications
 * ----------------------------------------------------------
 */
router.post(

    "/",

    authMiddleware,

    validate(
        sendNotificationSchema
    ),

    notificationController.sendNotification

);










/**
 * ----------------------------------------------------------
 * Bulk Notifications
 * POST /notifications/bulk
 * ----------------------------------------------------------
 */
router.post(

    "/bulk",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        bulkNotificationSchema
    ),

    notificationController.sendBulkNotifications

);










/**
 * ----------------------------------------------------------
 * Broadcast Notification
 * POST /notifications/broadcast
 * ----------------------------------------------------------
 */
router.post(

    "/broadcast",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        broadcastSchema
    ),

    notificationController.sendBroadcast

);










/**
 * ----------------------------------------------------------
 * Emergency Alert
 * POST /notifications/emergency
 * ----------------------------------------------------------
 */
router.post(

    "/emergency",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "DISASTER_MANAGER"
    ),

    validate(
        emergencySchema
    ),

    notificationController.sendEmergencyAlert

);










/**
 * ----------------------------------------------------------
 * Retry Failed Notifications
 * POST /notifications/retry
 * ----------------------------------------------------------
 */
router.post(

    "/retry",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    notificationController.retryFailedNotifications

);










/**
 * ----------------------------------------------------------
 * Process Scheduled Notifications
 * POST /notifications/process-scheduled
 * ----------------------------------------------------------
 */
router.post(

    "/process-scheduled",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    notificationController.processScheduledNotifications

);