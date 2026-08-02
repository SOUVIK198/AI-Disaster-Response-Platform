/**
 * ------------------------------------------------------------------
 * File: notification.controller.ts
 * ------------------------------------------------------------------
 */

import {

    Request,

    Response,

    NextFunction

} from "express";

import notificationService
from "./notification.service";

class NotificationController {

    /**
     * ----------------------------------------------------------
     * Send Notification
     * ----------------------------------------------------------
     */
    async sendNotification(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const notification =

            await notificationService.sendNotification(

                req.body

            );

            res.status(201).json({

                success: true,

                message:
                "Notification sent successfully",

                data: notification

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Send Bulk Notifications
     * ----------------------------------------------------------
     */
    async sendBulkNotifications(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const notifications =

            await notificationService.sendBulkNotifications(

                req.body.notifications

            );

            res.status(201).json({

                success: true,

                count: notifications.length,

                data: notifications

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * User Notifications
     * ----------------------------------------------------------
     */
    async getUserNotifications(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const notifications =

            await notificationService.getUserNotifications(

                req.params.userId

            );

            res.status(200).json({

                success: true,

                count: notifications.length,

                data: notifications

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Get Unread Notifications
     * ----------------------------------------------------------
     */
    async getUnreadNotifications(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const notifications =

            await notificationService.getUnreadNotifications(

                req.params.userId

            );

            res.status(200).json({

                success: true,

                count: notifications.length,

                data: notifications

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Mark Notification As Read
     * ----------------------------------------------------------
     */
    async markAsRead(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const notification =

            await notificationService.markAsRead(

                req.params.notificationId

            );

            res.status(200).json({

                success: true,

                message:
                "Notification marked as read",

                data: notification

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Mark All Notifications As Read
     * ----------------------------------------------------------
     */
    async markAllAsRead(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            await notificationService.markAllAsRead(

                req.params.userId

            );

            res.status(200).json({

                success: true,

                message:
                "All notifications marked as read"

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new NotificationController();
/**
 * ----------------------------------------------------------
 * Broadcast Notification
 * POST /notifications/broadcast
 * ----------------------------------------------------------
 */
async sendBroadcast(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const result =

        await notificationService.sendBroadcast(

            req.body.notifications

        );

        res.status(200).json({

            success: true,

            message:
            "Broadcast notification sent successfully",

            count: result.length,

            data: result

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Emergency Alert
 * POST /notifications/emergency
 * ----------------------------------------------------------
 */
async sendEmergencyAlert(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const result =

        await notificationService.sendEmergencyAlert(

            req.body.notifications

        );

        res.status(200).json({

            success: true,

            message:
            "Emergency alerts sent successfully",

            count: result.length,

            data: result

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Retry Failed Notifications
 * POST /notifications/retry
 * ----------------------------------------------------------
 */
async retryFailedNotifications(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const result =

        await notificationService.retryFailedNotifications();

        res.status(200).json({

            success: true,

            count: result.length,

            data: result

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Process Scheduled Notifications
 * POST /notifications/process-scheduled
 * ----------------------------------------------------------
 */
async processScheduledNotifications(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const result =

        await notificationService.processScheduledNotifications();

        res.status(200).json({

            success: true,

            count: result.length,

            data: result

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Unread Notification Count
 * GET /notifications/count/:userId
 * ----------------------------------------------------------
 */
async countUnread(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const count =

        await notificationService.countUnread(

            req.params.userId

        );

        res.status(200).json({

            success: true,

            count

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Notification Analytics
 * GET /notifications/analytics
 * ----------------------------------------------------------
 */
async getAnalytics(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const analytics =

        await notificationService.getAnalytics();

        res.status(200).json({

            success: true,

            data: analytics

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Recommend Notification Channel
 * POST /notifications/channel/recommend
 * ----------------------------------------------------------
 */
async recommendChannel(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const channel =

        notificationService.recommendChannel(

            req.body

        );

        res.status(200).json({

            success: true,

            recommendedChannel: channel

        });

    }

    catch (error) {

        next(error);

    }

}