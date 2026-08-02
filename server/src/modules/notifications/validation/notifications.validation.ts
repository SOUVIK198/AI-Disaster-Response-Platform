/**
 * ------------------------------------------------------------------
 * File: notification.validation.ts
 * ------------------------------------------------------------------
 */

import { z } from "zod";

import {

    NotificationChannel,

    NotificationPriority,

    NotificationType,

    RecipientType

} from "./notification.types";










/**
 * ----------------------------------------------------------
 * Recipient
 * ----------------------------------------------------------
 */
export const recipientSchema = z.object({

    userId:

        z.string().min(1),

    recipientType:

        z.nativeEnum(
            RecipientType
        ),

    name:

        z.string().optional(),

    email:

        z.string()
        .email()
        .optional(),

    phone:

        z.string()
        .min(10)
        .optional(),

    deviceToken:

        z.string()
        .optional()

});










/**
 * ----------------------------------------------------------
 * Payload
 * ----------------------------------------------------------
 */
export const payloadSchema = z.object({

    title:

        z.string()
        .min(2)
        .max(150),

    message:

        z.string()
        .min(2)
        .max(5000),

    imageUrl:

        z.string()
        .url()
        .optional(),

    actionUrl:

        z.string()
        .url()
        .optional(),

    metadata:

        z.record(z.any())
        .optional()

});










/**
 * ----------------------------------------------------------
 * Delivery
 * ----------------------------------------------------------
 */
export const deliverySchema = z.object({

    channel:

        z.nativeEnum(
            NotificationChannel
        )

});










/**
 * ----------------------------------------------------------
 * Send Notification
 * ----------------------------------------------------------
 */
export const sendNotificationSchema =

z.object({

    notificationId:

        z.string().min(3),

    type:

        z.nativeEnum(
            NotificationType
        ),

    priority:

        z.nativeEnum(
            NotificationPriority
        )
        .default(
            NotificationPriority.NORMAL
        ),

    recipient:

        recipientSchema,

    payload:

        payloadSchema,

    delivery:

        deliverySchema,

    scheduledFor:

        z.coerce.date()
        .optional(),

    expiresAt:

        z.coerce.date()
        .optional(),

    isBroadcast:

        z.boolean()
        .default(false),

    templateName:

        z.string()
        .optional(),

    createdBy:

        z.string()
        .optional()

});
/**
 * ------------------------------------------------------------------
 * Bulk Notifications
 * ------------------------------------------------------------------
 */
export const bulkNotificationSchema =

z.object({

    notifications:

    z.array(

        sendNotificationSchema

    )

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Broadcast Notifications
 * ------------------------------------------------------------------
 */
export const broadcastSchema =

z.object({

    notifications:

    z.array(

        sendNotificationSchema.extend({

            isBroadcast:

            z.literal(true)

        })

    )

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Emergency Notifications
 * ------------------------------------------------------------------
 */
export const emergencySchema =

z.object({

    notifications:

    z.array(

        sendNotificationSchema.extend({

            priority:

            z.literal(

                NotificationPriority.CRITICAL

            )

        })

    )

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Mark Notification Read
 * ------------------------------------------------------------------
 */
export const markReadSchema =

z.object({

    notificationId:

    z.string()

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Mark All Notifications Read
 * ------------------------------------------------------------------
 */
export const markAllReadSchema =

z.object({

    userId:

    z.string()

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Recommend Notification Channel
 * ------------------------------------------------------------------
 */
export const recommendChannelSchema =

z.object({

    priority:

    z.nativeEnum(

        NotificationPriority

    ),

    recipient:

    recipientSchema

});










/**
 * ------------------------------------------------------------------
 * Count Notifications
 * ------------------------------------------------------------------
 */
export const countSchema =

z.object({

    userId:

    z.string()

    .min(1)

});










/**
 * ------------------------------------------------------------------
 * Analytics Query
 * ------------------------------------------------------------------
 */
export const analyticsSchema =

z.object({

    from:

    z.coerce

    .date()

    .optional(),

    to:

    z.coerce

    .date()

    .optional()

});










/**
 * ------------------------------------------------------------------
 * Export Validators
 * ------------------------------------------------------------------
 */
export const notificationValidators = {

    sendNotificationSchema,

    bulkNotificationSchema,

    broadcastSchema,

    emergencySchema,

    markReadSchema,

    markAllReadSchema,

    recommendChannelSchema,

    countSchema,

    analyticsSchema

};