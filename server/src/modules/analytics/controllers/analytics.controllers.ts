/**
 * ------------------------------------------------------------------
 * File: analytics.controller.ts
 * ------------------------------------------------------------------
 */

import {

    Request,

    Response,

    NextFunction

} from "express";

import analyticsService
from "./analytics.service";

import {

    AnalyticsRange,

    AnalyticsCategory,

    ReportFormat

} from "./analytics.types";

class AnalyticsController {

    /**
     * ----------------------------------------------------------
     * Create Analytics Snapshot
     * POST /analytics/snapshot
     * ----------------------------------------------------------
     */
    async createSnapshot(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const analytics =

            await analyticsService.createSnapshot(

                req.body

            );

            res.status(201).json({

                success: true,

                message:
                "Analytics snapshot created.",

                data: analytics

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Generate Dashboard
     * POST /analytics/dashboard
     * ----------------------------------------------------------
     */
    async generateDashboard(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const dashboard =

            await analyticsService.generateDashboard(

                req.body

            );

            res.status(201).json({

                success: true,

                message:
                "Dashboard generated successfully.",

                data: dashboard

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Latest Dashboard
     * GET /analytics/dashboard/:range
     * ----------------------------------------------------------
     */
    async getDashboard(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const dashboard =

            await analyticsService.getDashboard(

                req.params.range as AnalyticsRange

            );

            res.status(200).json({

                success: true,

                data: dashboard

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Dashboard History
     * GET /analytics/history/:range
     * ----------------------------------------------------------
     */
    async getHistory(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const history =

            await analyticsService.getHistory(

                req.params.range as AnalyticsRange

            );

            res.status(200).json({

                success: true,

                count: history.length,

                data: history

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Dashboard Statistics
     * GET /analytics/statistics/:range
     * ----------------------------------------------------------
     */
    async dashboardStatistics(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const statistics =

            await analyticsService.dashboardStatistics(

                req.params.range as AnalyticsRange

            );

            res.status(200).json({

                success: true,

                data: statistics

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Charts
     * GET /analytics/charts/:range
     * ----------------------------------------------------------
     */
    async getCharts(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const charts =

            await analyticsService.getCharts(

                req.params.range as AnalyticsRange

            );

            res.status(200).json({

                success: true,

                data: charts

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Heatmap
     * GET /analytics/heatmap/:range
     * ----------------------------------------------------------
     */
    async getHeatmap(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const heatmap =

            await analyticsService.getHeatmap(

                req.params.range as AnalyticsRange

            );

            res.status(200).json({

                success: true,

                data: heatmap

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new AnalyticsController();
/**
 * ----------------------------------------------------------
 * Generate Export Report
 * POST /analytics/report
 * ----------------------------------------------------------
 */
async generateReport(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const {

            analyticsId,

            category,

            format

        } = req.body;

        const report =

        await analyticsService.generateReport(

            analyticsId,

            category as AnalyticsCategory,

            format as ReportFormat

        );

        res.status(201).json({

            success: true,

            message:
            "Report generation started.",

            data: report

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Update Export Status
 * PATCH /analytics/report/status
 * ----------------------------------------------------------
 */
async updateExportStatus(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const {

            analyticsId,

            reportId,

            status,

            downloadUrl

        } = req.body;

        const report =

        await analyticsService.updateExportStatus(

            analyticsId,

            reportId,

            status,

            downloadUrl

        );

        res.status(200).json({

            success: true,

            data: report

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Export History
 * GET /analytics/report/history/:range
 * ----------------------------------------------------------
 */
async exportHistory(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const history =

        await analyticsService.exportHistory(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            count: history.length,

            data: history

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Incident Trend
 * ----------------------------------------------------------
 */
async incidentTrend(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const trend =

        await analyticsService.incidentTrend(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            data: trend

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Volunteer Trend
 * ----------------------------------------------------------
 */
async volunteerTrend(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const trend =

        await analyticsService.volunteerTrend(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            data: trend

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Notification Trend
 * ----------------------------------------------------------
 */
async notificationTrend(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const trend =

        await analyticsService.notificationTrend(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            data: trend

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Response Time Trend
 * ----------------------------------------------------------
 */
async responseTimeTrend(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const trend =

        await analyticsService.responseTimeTrend(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            data: trend

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * AI Summary
 * ----------------------------------------------------------
 */
async generateAISummary(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const summary =

        await analyticsService.generateAISummary(

            req.params.range as AnalyticsRange

        );

        res.status(200).json({

            success: true,

            data: summary

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Cleanup Expired Snapshots
 * DELETE /analytics/cleanup
 * ----------------------------------------------------------
 */
async cleanupExpired(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const result =

        await analyticsService.cleanupExpired();

        res.status(200).json({

            success: true,

            deletedCount:

            result.deletedCount

        });

    }

    catch (error) {

        next(error);

    }

}