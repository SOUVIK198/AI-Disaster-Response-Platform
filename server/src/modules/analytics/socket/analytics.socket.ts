/**
 * ------------------------------------------------------------------
 * File: analytics.socket.ts
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

class AnalyticsSocket {

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

                    `Analytics Socket Connected: ${socket.id}`

                );









                /**
                 * Join Dashboard
                 */
                socket.on(

                    "join_dashboard",

                    (dashboardId: string) => {

                        socket.join(

                            `dashboard:${dashboardId}`

                        );

                    }

                );









                /**
                 * Leave Dashboard
                 */
                socket.on(

                    "leave_dashboard",

                    (dashboardId: string) => {

                        socket.leave(

                            `dashboard:${dashboardId}`

                        );

                    }

                );









                /**
                 * Refresh Dashboard
                 */
                socket.on(

                    "refresh_dashboard",

                    (dashboardId: string) => {

                        this.io.to(

                            `dashboard:${dashboardId}`

                        ).emit(

                            "dashboard_refresh",

                            {

                                timestamp:

                                new Date()

                            }

                        );

                    }

                );









                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `Analytics Socket Disconnected: ${socket.id}`

                        );

                    }

                );

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Dashboard Updated
     * ----------------------------------------------------------
     */
    dashboardUpdated(

        dashboardId: string,

        payload: any

    ) {

        this.io.to(

            `dashboard:${dashboardId}`

        ).emit(

            "dashboard_updated",

            {

                ...payload,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Incident Count Update
     * ----------------------------------------------------------
     */
    incidentUpdated(

        dashboardId: string,

        total: number,

        active: number

    ) {

        this.io.to(

            `dashboard:${dashboardId}`

        ).emit(

            "incident_updated",

            {

                total,

                active,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Volunteer Update
     * ----------------------------------------------------------
     */
    volunteerUpdated(

        dashboardId: string,

        payload: any

    ) {

        this.io.to(

            `dashboard:${dashboardId}`

        ).emit(

            "volunteer_updated",

            {

                ...payload,

                timestamp:

                new Date()

            }

        );

    }

}
/**
 * ----------------------------------------------------------
 * Notification Statistics Updated
 * ----------------------------------------------------------
 */
notificationUpdated(

    dashboardId: string,

    payload: any

) {

    this.io.to(

        `dashboard:${dashboardId}`

    ).emit(

        "notification_updated",

        {

            ...payload,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Response Time Updated
 * ----------------------------------------------------------
 */
responseTimeUpdated(

    dashboardId: string,

    averageResponseTime: number

) {

    this.io.to(

        `dashboard:${dashboardId}`

    ).emit(

        "response_time_updated",

        {

            averageResponseTime,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Heatmap Updated
 * ----------------------------------------------------------
 */
heatmapUpdated(

    dashboardId: string,

    heatmap: any[]

) {

    this.io.to(

        `dashboard:${dashboardId}`

    ).emit(

        "heatmap_updated",

        {

            heatmap,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Report Status Updated
 * ----------------------------------------------------------
 */
reportStatusUpdated(

    dashboardId: string,

    report: any

) {

    this.io.to(

        `dashboard:${dashboardId}`

    ).emit(

        "report_status_updated",

        {

            report,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * AI Summary Updated
 * ----------------------------------------------------------
 */
aiSummaryUpdated(

    dashboardId: string,

    summary: any

) {

    this.io.to(

        `dashboard:${dashboardId}`

    ).emit(

        "ai_summary_updated",

        {

            summary,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Broadcast Analytics Event
 * ----------------------------------------------------------
 */
broadcastAnalytics(

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