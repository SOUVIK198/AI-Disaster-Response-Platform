/**
 * ------------------------------------------------------------------
 * File: notification.repository.ts
 * ------------------------------------------------------------------
 */

import {

    Notification,

    INotificationDocument

} from "./notification.model";

import {

    INotification

} from "./notification.interface";

class NotificationRepository {

    /**
     * ----------------------------------------------------------
     * Create Notification
     * ----------------------------------------------------------
     */
    async create(
        data: Partial<INotification>
    ): Promise<INotificationDocument> {

        return Notification.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Bulk Create Notifications
     * ----------------------------------------------------------
     */
    async createMany(
        data: Partial<INotification>[]
    ) {

        return Notification.insertMany(data);

    }










    /**
     * ----------------------------------------------------------
     * Find By ID
     * ----------------------------------------------------------
     */
    async findById(
        id: string
    ) {

        return Notification.findById(id);

    }










    /**
     * ----------------------------------------------------------
     * Find By Notification ID
     * ----------------------------------------------------------
     */
    async findByNotificationId(
        notificationId: string
    ) {

        return Notification.findOne({

            notificationId

        });

    }










    /**
     * ----------------------------------------------------------
     * User Notifications
     * ----------------------------------------------------------
     */
    async getUserNotifications(

        userId: string,

        limit: number = 50

    ) {

        return Notification.find({

            "recipient.userId": userId

        })

        .sort({

            createdAt: -1

        })

        .limit(limit);

    }










    /**
     * ----------------------------------------------------------
     * Unread Notifications
     * ----------------------------------------------------------
     */
    async getUnreadNotifications(
        userId: string
    ) {

        return Notification.find({

            "recipient.userId": userId,

            "delivery.status": {

                $ne: "READ"

            }

        });

    }










    /**
     * ----------------------------------------------------------
     * Update Notification
     * ----------------------------------------------------------
     */
    async update(

        id: string,

        data: Partial<INotification>

    ) {

        return Notification.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Delete Notification
     * ----------------------------------------------------------
     */
    async delete(
        id: string
    ) {

        return Notification.findByIdAndDelete(id);

    }

}

export default new NotificationRepository();
/**
 * ----------------------------------------------------------
 * Mark Notification As Read
 * ----------------------------------------------------------
 */
async markAsRead(
    notificationId: string
) {

    return Notification.findOneAndUpdate(

        {

            notificationId

        },

        {

            $set: {

                "delivery.status": "READ",

                "delivery.readAt": new Date()

            }

        },

        {

            new: true

        }

    );

}










/**
 * ----------------------------------------------------------
 * Mark All Notifications As Read
 * ----------------------------------------------------------
 */
async markAllAsRead(
    userId: string
) {

    return Notification.updateMany(

        {

            "recipient.userId": userId,

            "delivery.status": {

                $ne: "READ"

            }

        },

        {

            $set: {

                "delivery.status": "READ",

                "delivery.readAt": new Date()

            }

        }

    );

}










/**
 * ----------------------------------------------------------
 * Update Delivery Status
 * ----------------------------------------------------------
 */
async updateDeliveryStatus(

    notificationId: string,

    status: string,

    failureReason?: string

) {

    const update: any = {

        "delivery.status": status

    };

    if (status === "SENT") {

        update["delivery.sentAt"] =
            new Date();

    }

    if (status === "DELIVERED") {

        update["delivery.deliveredAt"] =
            new Date();

    }

    if (status === "FAILED") {

        update["delivery.failureReason"] =
            failureReason;

    }

    return Notification.findOneAndUpdate(

        {

            notificationId

        },

        {

            $set: update

        },

        {

            new: true

        }

    );

}










/**
 * ----------------------------------------------------------
 * Retry Notification
 * ----------------------------------------------------------
 */
async retryNotification(
    notificationId: string
) {

    return Notification.findOneAndUpdate(

        {

            notificationId

        },

        {

            $inc: {

                "retry.retryCount": 1

            },

            $set: {

                "retry.retryStatus":
                "RETRYING",

                "delivery.status":
                "PENDING"

            }

        },

        {

            new: true

        }

    );

}










/**
 * ----------------------------------------------------------
 * Scheduled Notifications
 * ----------------------------------------------------------
 */
async getScheduledNotifications() {

    return Notification.find({

        scheduledFor: {

            $lte: new Date()

        },

        "delivery.status":
        "PENDING"

    });

}










/**
 * ----------------------------------------------------------
 * Failed Notifications
 * ----------------------------------------------------------
 */
async getFailedNotifications() {

    return Notification.find({

        "delivery.status":
        "FAILED",

        "retry.retryCount": {

            $lt: 3

        }

    });

}










/**
 * ----------------------------------------------------------
 * Notification Analytics
 * ----------------------------------------------------------
 */
async getAnalytics() {

    return Notification.aggregate([

        {

            $group: {

                _id: "$delivery.status",

                total: {

                    $sum: 1

                }

            }

        }

    ]);

}










/**
 * ----------------------------------------------------------
 * Broadcast Notifications
 * ----------------------------------------------------------
 */
async getBroadcastNotifications() {

    return Notification.find({

        isBroadcast: true

    }).sort({

        createdAt: -1

    });

}










/**
 * ----------------------------------------------------------
 * Delete Expired Notifications
 * ----------------------------------------------------------
 */
async deleteExpired() {

    return Notification.deleteMany({

        expiresAt: {

            $lt: new Date()

        }

    });

}










/**
 * ----------------------------------------------------------
 * Count Unread Notifications
 * ----------------------------------------------------------
 */
async countUnread(
    userId: string
) {

    return Notification.countDocuments({

        "recipient.userId": userId,

        "delivery.status": {

            $ne: "READ"

        }

    );

}