/**
 * ------------------------------------------------------------------
 * File: analytics.routes.ts
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import analyticsController
from "./analytics.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    snapshotSchema,

    dashboardSchema,

    generateReportSchema,

    updateReportStatusSchema,

    trendSchema

} from "./analytics.validation";

const router = Router();










/**
 * ----------------------------------------------------------
 * Create Snapshot
 * POST /analytics/snapshot
 * ----------------------------------------------------------
 */
router.post(

    "/snapshot",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    validate(

        snapshotSchema

    ),

    analyticsController.createSnapshot

);










/**
 * ----------------------------------------------------------
 * Generate Dashboard
 * POST /analytics/dashboard
 * ----------------------------------------------------------
 */
router.post(

    "/dashboard",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    validate(

        snapshotSchema

    ),

    analyticsController.generateDashboard

);










/**
 * ----------------------------------------------------------
 * Latest Dashboard
 * GET /analytics/dashboard/:range
 * ----------------------------------------------------------
 */
router.get(

    "/dashboard/:range",

    authMiddleware,

    analyticsController.getDashboard

);










/**
 * ----------------------------------------------------------
 * Dashboard History
 * GET /analytics/history/:range
 * ----------------------------------------------------------
 */
router.get(

    "/history/:range",

    authMiddleware,

    analyticsController.getHistory

);










/**
 * ----------------------------------------------------------
 * Dashboard Statistics
 * GET /analytics/statistics/:range
 * ----------------------------------------------------------
 */
router.get(

    "/statistics/:range",

    authMiddleware,

    analyticsController.dashboardStatistics

);










/**
 * ----------------------------------------------------------
 * Charts
 * GET /analytics/charts/:range
 * ----------------------------------------------------------
 */
router.get(

    "/charts/:range",

    authMiddleware,

    analyticsController.getCharts

);










/**
 * ----------------------------------------------------------
 * Heatmap
 * GET /analytics/heatmap/:range
 * ----------------------------------------------------------
 */
router.get(

    "/heatmap/:range",

    authMiddleware,

    analyticsController.getHeatmap

);










/**
 * ----------------------------------------------------------
 * Generate Report
 * POST /analytics/report
 * ----------------------------------------------------------
 */
router.post(

    "/report",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    validate(

        generateReportSchema

    ),

    analyticsController.generateReport

);
/**
 * ----------------------------------------------------------
 * Update Report Status
 * PATCH /analytics/report/status
 * ----------------------------------------------------------
 */
router.patch(

    "/report/status",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    validate(

        updateReportStatusSchema

    ),

    analyticsController.updateExportStatus

);










/**
 * ----------------------------------------------------------
 * Export History
 * GET /analytics/report/history/:range
 * ----------------------------------------------------------
 */
router.get(

    "/report/history/:range",

    authMiddleware,

    analyticsController.exportHistory

);










/**
 * ----------------------------------------------------------
 * Incident Trend
 * GET /analytics/trends/incidents/:range
 * ----------------------------------------------------------
 */
router.get(

    "/trends/incidents/:range",

    authMiddleware,

    analyticsController.incidentTrend

);










/**
 * ----------------------------------------------------------
 * Volunteer Trend
 * GET /analytics/trends/volunteers/:range
 * ----------------------------------------------------------
 */
router.get(

    "/trends/volunteers/:range",

    authMiddleware,

    analyticsController.volunteerTrend

);










/**
 * ----------------------------------------------------------
 * Notification Trend
 * GET /analytics/trends/notifications/:range
 * ----------------------------------------------------------
 */
router.get(

    "/trends/notifications/:range",

    authMiddleware,

    analyticsController.notificationTrend

);










/**
 * ----------------------------------------------------------
 * Response Time Trend
 * GET /analytics/trends/response/:range
 * ----------------------------------------------------------
 */
router.get(

    "/trends/response/:range",

    authMiddleware,

    analyticsController.responseTimeTrend

);










/**
 * ----------------------------------------------------------
 * AI Summary
 * GET /analytics/summary/:range
 * ----------------------------------------------------------
 */
router.get(

    "/summary/:range",

    authMiddleware,

    analyticsController.generateAISummary

);










/**
 * ----------------------------------------------------------
 * Cleanup Expired Analytics
 * DELETE /analytics/cleanup
 * ----------------------------------------------------------
 */
router.delete(

    "/cleanup",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    analyticsController.cleanupExpired

);










export default router;