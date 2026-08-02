/**
 * ------------------------------------------------------------------
 * File: notification.service.ts
 * ------------------------------------------------------------------
 */

import notificationRepository
from "./notification.repository";

import {

    INotification

} from "./notification.interface";

import {

    NotificationChannel,

    NotificationStatus

} from "./notification.types";

import emailService from "./email.service";
import smsService from "./sms.service";
import pushService from "./push.service";

class NotificationService {

    /**
     * ----------------------------------------------------------
     * Create Notification
     * ----------------------------------------------------------
     */
    async createNotification(
        data: Partial<INotification>
    ) {

        return notificationRepository.create(
            data
        );

    }










    /**
     * ----------------------------------------------------------
     * Send Notification
     * ----------------------------------------------------------
     */
    async sendNotification(
        data: Partial<INotification>
    ) {

        const notification =

        await notificationRepository.create(
            data
        );

        const {

            recipient,

            payload,

            delivery

        } = notification;

        switch (delivery.channel) {

            case NotificationChannel.EMAIL:

                if (recipient.email) {

                    await emailService.send(

                        recipient.email,

                        payload.title,

                        payload.message

                    );

                }

                break;

            case NotificationChannel.SMS:

                if (recipient.phone) {

                    await smsService.send(

                        recipient.phone,

                        payload.message

                    );

                }

                break;

            case NotificationChannel.PUSH:

                if (recipient.deviceToken) {

                    await pushService.send(

                        recipient.deviceToken,

                        payload.title,

                        payload.message

                    );

                }

                break;

            case NotificationChannel.IN_APP:

                // Delivered through socket
                break;

        }

        await notificationRepository
        .updateDeliveryStatus(

            notification.notificationId,

            NotificationStatus.SENT

        );

        return notification;

    }










    /**
     * ----------------------------------------------------------
     * User Notifications
     * ----------------------------------------------------------
     */
    async getUserNotifications(
        userId: string
    ) {

        return notificationRepository
        .getUserNotifications(userId);

    }










    /**
     * ----------------------------------------------------------
     * Unread Notifications
     * ----------------------------------------------------------
     */
    async getUnreadNotifications(
        userId: string
    ) {

        return notificationRepository
        .getUnreadNotifications(userId);

    }










    /**
     * ----------------------------------------------------------
     * Mark As Read
     * ----------------------------------------------------------
     */
    async markAsRead(
        notificationId: string
    ) {

        const notification =

        await notificationRepository
        .markAsRead(notificationId);

        if (!notification) {

            throw new Error(
                "Notification not found"
            );

        }

        return notification;

    }










    /**
     * ----------------------------------------------------------
     * Mark All As Read
     * ----------------------------------------------------------
     */
    async markAllAsRead(
        userId: string
    ) {

        return notificationRepository
        .markAllAsRead(userId);

    }

}

export default new NotificationService();
/**
 * ----------------------------------------------------------
 * Send Bulk Notifications
 * ----------------------------------------------------------
 */
async sendBulkNotifications(
    notifications: Partial<INotification>[]
) {

    const results = [];

    for (const notification of notifications) {

        try {

            const result =
                await this.sendNotification(notification);

            results.push(result);

        } catch (error) {

            console.error(
                "Bulk notification failed:",
                error
            );

        }

    }

    return results;

}










/**
 * ----------------------------------------------------------
 * Broadcast Notification
 * ----------------------------------------------------------
 */
async sendBroadcast(
    notifications: Partial<INotification>[]
) {

    return this.sendBulkNotifications(
        notifications
    );

}










/**
 * ----------------------------------------------------------
 * Retry Failed Notifications
 * ----------------------------------------------------------
 */
async retryFailedNotifications() {

    const failedNotifications =
        await notificationRepository
        .getFailedNotifications();

    const retried = [];

    for (const notification of failedNotifications) {

        await notificationRepository.retryNotification(
            notification.notificationId
        );

        retried.push(

            await this.sendNotification(
                notification.toObject()
            )

        );

    }

    return retried;

}










/**
 * ----------------------------------------------------------
 * Process Scheduled Notifications
 * ----------------------------------------------------------
 */
async processScheduledNotifications() {

    const scheduled =
        await notificationRepository
        .getScheduledNotifications();

    const sent = [];

    for (const notification of scheduled) {

        sent.push(

            await this.sendNotification(
                notification.toObject()
            )

        );

    }

    return sent;

}










/**
 * ----------------------------------------------------------
 * Count Unread Notifications
 * ----------------------------------------------------------
 */
async countUnread(
    userId: string
) {

    return notificationRepository.countUnread(
        userId
    );

}










/**
 * ----------------------------------------------------------
 * Notification Analytics
 * ----------------------------------------------------------
 */
async getAnalytics() {

    return notificationRepository.getAnalytics();

}










/**
 * ----------------------------------------------------------
 * AI Channel Recommendation
 * ----------------------------------------------------------
 */
recommendChannel(
    notification: Partial<INotification>
): NotificationChannel {

    if (
        notification.priority === "CRITICAL"
    ) {

        return NotificationChannel.SMS;

    }

    if (
        notification.recipient?.deviceToken
    ) {

        return NotificationChannel.PUSH;

    }

    if (
        notification.recipient?.email
    ) {

        return NotificationChannel.EMAIL;

    }

    return NotificationChannel.IN_APP;

}










/**
 * ----------------------------------------------------------
 * Emergency Alert
 * ----------------------------------------------------------
 */
async sendEmergencyAlert(
    notifications: Partial<INotification>[]
) {

    for (const notification of notifications) {

        notification.priority = "CRITICAL";

        notification.delivery = {

            ...notification.delivery,

            channel:
            NotificationChannel.SMS,

            status:
            NotificationStatus.PENDING

        };

    }

    return this.sendBulkNotifications(
        notifications
    );

}