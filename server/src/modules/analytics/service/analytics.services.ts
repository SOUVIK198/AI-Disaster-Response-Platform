/**
 * ------------------------------------------------------------------
 * File: analytics.service.ts
 * ------------------------------------------------------------------
 */

import analyticsRepository from "./analytics.repository";

import {

    AnalyticsRange,

    ReportFormat,

    ExportStatus,

    AnalyticsCategory

} from "./analytics.types";

import {

    IAnalytics

} from "./analytics.interface";

class AnalyticsService {

    /**
     * ----------------------------------------------------------
     * Create Analytics Snapshot
     * ----------------------------------------------------------
     */
    async createSnapshot(
        data: Partial<IAnalytics>
    ) {

        return analyticsRepository.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Get Latest Dashboard
     * ----------------------------------------------------------
     */
    async getDashboard(
        range: AnalyticsRange
    ) {

        return analyticsRepository
            .getLatestDashboard(range);

    }










    /**
     * ----------------------------------------------------------
     * Dashboard History
     * ----------------------------------------------------------
     */
    async getHistory(
        range: AnalyticsRange
    ) {

        return analyticsRepository
            .getHistory(range);

    }










    /**
     * ----------------------------------------------------------
     * Generate Dashboard Snapshot
     * ----------------------------------------------------------
     */
    async generateDashboard(
        data: Partial<IAnalytics>
    ) {

        /**
         * In production this method will:
         *
         * - Aggregate Incident collection
         * - Aggregate Volunteer collection
         * - Aggregate Hospital collection
         * - Aggregate Shelter collection
         * - Aggregate NGO collection
         * - Aggregate Notification collection
         * - Build charts
         * - Build heatmaps
         */

        return analyticsRepository.create({

            ...data,

            generatedAt: new Date()

        });

    }










    /**
     * ----------------------------------------------------------
     * Dashboard Statistics
     * ----------------------------------------------------------
     */
    async dashboardStatistics(
        range: AnalyticsRange
    ) {

        return analyticsRepository
            .dashboardStatistics(range);

    }










    /**
     * ----------------------------------------------------------
     * Chart Data
     * ----------------------------------------------------------
     */
    async getCharts(
        range: AnalyticsRange
    ) {

        return analyticsRepository
            .getCharts(range);

    }










    /**
     * ----------------------------------------------------------
     * Heatmap Data
     * ----------------------------------------------------------
     */
    async getHeatmap(
        range: AnalyticsRange
    ) {

        return analyticsRepository
            .getHeatmap(range);

    }

}

export default new AnalyticsService();
/**
 * ----------------------------------------------------------
 * Generate Export Report
 * ----------------------------------------------------------
 */
async generateReport(

    analyticsId: string,

    category: AnalyticsCategory,

    format: ReportFormat

) {

    const report = {

        reportId:

        `REPORT-${Date.now()}`,

        category,

        format,

        status:

        ExportStatus.PROCESSING,

        generatedAt:

        new Date()

    };

    return analyticsRepository.saveReport(

        analyticsId,

        report

    );

}










/**
 * ----------------------------------------------------------
 * Update Export Status
 * ----------------------------------------------------------
 */
async updateExportStatus(

    analyticsId: string,

    reportId: string,

    status: ExportStatus,

    downloadUrl?: string

) {

    return analyticsRepository.updateExportStatus(

        analyticsId,

        reportId,

        status,

        downloadUrl

    );

}










/**
 * ----------------------------------------------------------
 * Incident Trend
 * ----------------------------------------------------------
 */
async incidentTrend(
    range: AnalyticsRange
) {

    return analyticsRepository.incidentTrend(
        range
    );

}










/**
 * ----------------------------------------------------------
 * Volunteer Trend
 * ----------------------------------------------------------
 */
async volunteerTrend(
    range: AnalyticsRange
) {

    return analyticsRepository.volunteerTrend(
        range
    );

}










/**
 * ----------------------------------------------------------
 * Notification Trend
 * ----------------------------------------------------------
 */
async notificationTrend(
    range: AnalyticsRange
) {

    return analyticsRepository.notificationTrend(
        range
    );

}










/**
 * ----------------------------------------------------------
 * Response Time Trend
 * ----------------------------------------------------------
 */
async responseTimeTrend(
    range: AnalyticsRange
) {

    return analyticsRepository.responseTimeTrend(
        range
    );

}










/**
 * ----------------------------------------------------------
 * Export History
 * ----------------------------------------------------------
 */
async exportHistory(
    range: AnalyticsRange
) {

    return analyticsRepository.exportHistory(
        range
    );

}










/**
 * ----------------------------------------------------------
 * Cleanup Expired Snapshots
 * ----------------------------------------------------------
 */
async cleanupExpired() {

    return analyticsRepository.cleanupExpired();

}










/**
 * ----------------------------------------------------------
 * AI Analytics Summary
 * ----------------------------------------------------------
 */
async generateAISummary(
    range: AnalyticsRange
) {

    const dashboard =
        await this.getDashboard(range);

    if (!dashboard) {

        return {

            summary:

            "No analytics data available."

        };

    }

    return {

        summary:
`Dashboard generated successfully for ${range}.`,

        incidents:

        dashboard.incidents,

        volunteers:

        dashboard.volunteers,

        hospitals:

        dashboard.hospitals,

        shelters:

        dashboard.shelters,

        notifications:

        dashboard.notifications,

        generatedAt:

        dashboard.generatedAt

    };

}