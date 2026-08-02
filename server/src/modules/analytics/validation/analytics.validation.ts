/**
 * ------------------------------------------------------------------
 * File: analytics.validation.ts
 * ------------------------------------------------------------------
 */

import { z } from "zod";

import {

    AnalyticsRange,

    AnalyticsCategory,

    ReportFormat,

    ExportStatus,

    ChartType

} from "./analytics.types";










/**
 * ----------------------------------------------------------
 * Dashboard Metric
 * ----------------------------------------------------------
 */
export const dashboardMetricSchema =

z.object({

    title:

    z.string()

    .min(1)

    .max(100),

    value:

    z.number(),

    previousValue:

    z.number()

    .optional(),

    percentageChange:

    z.number()

    .optional(),

    trend:

    z.enum([

        "UP",

        "DOWN",

        "STABLE"

    ])

});










/**
 * ----------------------------------------------------------
 * Chart Dataset
 * ----------------------------------------------------------
 */
export const chartDatasetSchema =

z.object({

    label:

    z.string(),

    data:

    z.array(

        z.number()

    )

});










/**
 * ----------------------------------------------------------
 * Chart Schema
 * ----------------------------------------------------------
 */
export const chartSchema =

z.object({

    title:

    z.string(),

    type:

    z.nativeEnum(

        ChartType

    ),

    labels:

    z.array(

        z.string()

    ),

    datasets:

    z.array(

        chartDatasetSchema

    )

});










/**
 * ----------------------------------------------------------
 * Heatmap Point
 * ----------------------------------------------------------
 */
export const heatmapPointSchema =

z.object({

    latitude:

    z.number(),

    longitude:

    z.number(),

    intensity:

    z.number(),

    incidentCount:

    z.number()

});
/**
 * ----------------------------------------------------------
 * Analytics Range
 * ----------------------------------------------------------
 */
export const rangeSchema =

z.object({

    range:

    z.nativeEnum(

        AnalyticsRange

    )

});










/**
 * ----------------------------------------------------------
 * Dashboard Request
 * ----------------------------------------------------------
 */
export const dashboardSchema =

z.object({

    range:

    z.nativeEnum(

        AnalyticsRange

    )

});










/**
 * ----------------------------------------------------------
 * Trend Request
 * ----------------------------------------------------------
 */
export const trendSchema =

z.object({

    range:

    z.nativeEnum(

        AnalyticsRange

    ),

    limit:

    z.coerce

    .number()

    .int()

    .min(1)

    .max(365)

    .optional()

});










/**
 * ----------------------------------------------------------
 * Export History
 * ----------------------------------------------------------
 */
export const exportHistorySchema =

z.object({

    range:

    z.nativeEnum(

        AnalyticsRange

    )

});










/**
 * ----------------------------------------------------------
 * AI Summary
 * ----------------------------------------------------------
 */
export const aiSummarySchema =

z.object({

    range:

    z.nativeEnum(

        AnalyticsRange

    )

});










/**
 * ----------------------------------------------------------
 * Cleanup
 * ----------------------------------------------------------
 */
export const cleanupSchema =

z.object({});










/**
 * ----------------------------------------------------------
 * Export Validators
 * ----------------------------------------------------------
 */
export const analyticsValidators = {

    dashboardMetricSchema,

    chartDatasetSchema,

    chartSchema,

    heatmapPointSchema,

    snapshotSchema,

    generateReportSchema,

    updateReportStatusSchema,

    rangeSchema,

    dashboardSchema,

    trendSchema,

    exportHistorySchema,

    aiSummarySchema,

    cleanupSchema

};