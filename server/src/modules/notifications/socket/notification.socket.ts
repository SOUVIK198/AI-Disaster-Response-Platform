/**
 * ------------------------------------------------------------------
 * File: notification.socket.ts
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

class NotificationSocket {

    private io: Server;










    constructor(
        io: Server
    ) {

        this.io = io;

    }










    /**
     * ----------------------------------------------------------
     * Register Socket Events
     * ----------------------------------------------------------
     */
    register() {

        this.io.on(

            "connection",

            (socket: Socket) => {

                console.log(

                    `Notification Socket Connected: ${socket.id}`

                );









                /**
                 * Join User Room
                 */
                socket.on(

                    "join_notifications",

                    (userId: string) => {

                        socket.join(

                            `user:${userId}`

                        );

                    }

                );









                /**
                 * Leave User Room
                 */
                socket.on(

                    "leave_notifications",

                    (userId: string) => {

                        socket.leave(

                            `user:${userId}`

                        );

                    }

                );









                /**
                 * Notification Read Acknowledgement
                 */
                socket.on(

                    "notification_read",

                    (payload) => {

                        this.io.to(

                            `user:${payload.userId}`

                        ).emit(

                            "notification_read_sync",

                            payload

                        );

                    }

                );









                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `Notification Socket Disconnected: ${socket.id}`

                        );

                    }

                );

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Send Notification
     * ----------------------------------------------------------
     */
    sendNotification(

        userId: string,

        notification: any

    ) {

        this.io.to(

            `user:${userId}`

        ).emit(

            "notification",

            {

                notification,

                timestamp: new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Update Unread Count
     * ----------------------------------------------------------
     */
    updateUnreadCount(

        userId: string,

        count: number

    ) {

        this.io.to(

            `user:${userId}`

        ).emit(

            "notification_count",

            {

                unread: count,

                timestamp: new Date()

            }

        );

    }

}
/**
 * ----------------------------------------------------------
 * Broadcast Notification
 * ----------------------------------------------------------
 */
broadcastNotification(
    notification: any
) {

    this.io.emit(

        "broadcast_notification",

        {

            notification,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Emergency Alert
 * ----------------------------------------------------------
 */
broadcastEmergency(
    payload: any
) {

    this.io.emit(

        "emergency_alert",

        {

            ...payload,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * System Announcement
 * ----------------------------------------------------------
 */
systemAnnouncement(
    title: string,
    message: string
) {

    this.io.emit(

        "system_announcement",

        {

            title,

            message,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Delivery Status Update
 * ----------------------------------------------------------
 */
updateDeliveryStatus(
    userId: string,
    notificationId: string,
    status: string
) {

    this.io.to(

        `user:${userId}`

    ).emit(

        "delivery_status",

        {

            notificationId,

            status,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Notification Deleted
 * ----------------------------------------------------------
 */
deleteNotification(
    userId: string,
    notificationId: string
) {

    this.io.to(

        `user:${userId}`

    ).emit(

        "notification_deleted",

        {

            notificationId,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Force Refresh Notification List
 * ----------------------------------------------------------
 */
refreshNotifications(
    userId: string
) {

    this.io.to(

        `user:${userId}`

    ).emit(

        "refresh_notifications",

        {

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Notify All Connected Clients
 * ----------------------------------------------------------
 */
notifyAll(
    event: string,
    payload: any
) {

    this.io.emit(

        event,

        {

            ...payload,

            timestamp: new Date()

        }

    );

}