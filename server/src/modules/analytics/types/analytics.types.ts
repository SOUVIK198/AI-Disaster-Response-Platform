/**
 * ------------------------------------------------------------------
 * File: analytics.types.ts
 * ------------------------------------------------------------------
 */

/**
 * Dashboard Time Range
 */
export enum AnalyticsRange {

    TODAY = "TODAY",

    WEEK = "WEEK",

    MONTH = "MONTH",

    YEAR = "YEAR",

    CUSTOM = "CUSTOM"

}










/**
 * Analytics Category
 */
export enum AnalyticsCategory {

    INCIDENT = "INCIDENT",

    VOLUNTEER = "VOLUNTEER",

    HOSPITAL = "HOSPITAL",

    SHELTER = "SHELTER",

    NGO = "NGO",

    USER = "USER",

    NOTIFICATION = "NOTIFICATION",

    RESOURCE = "RESOURCE"

}










/**
 * Report Format
 */
export enum ReportFormat {

    JSON = "JSON",

    CSV = "CSV",

    PDF = "PDF",

    EXCEL = "EXCEL"

}










/**
 * Dashboard Widget
 */
export enum DashboardWidget {

    TOTAL_INCIDENTS = "TOTAL_INCIDENTS",

    ACTIVE_INCIDENTS = "ACTIVE_INCIDENTS",

    RESOLVED_INCIDENTS = "RESOLVED_INCIDENTS",

    TOTAL_VOLUNTEERS = "TOTAL_VOLUNTEERS",

    ACTIVE_VOLUNTEERS = "ACTIVE_VOLUNTEERS",

    TOTAL_HOSPITALS = "TOTAL_HOSPITALS",

    TOTAL_SHELTERS = "TOTAL_SHELTERS",

    TOTAL_NGOS = "TOTAL_NGOS",

    NOTIFICATIONS_SENT = "NOTIFICATIONS_SENT",

    RESPONSE_TIME = "RESPONSE_TIME"

}










/**
 * Chart Type
 */
export enum ChartType {

    LINE = "LINE",

    BAR = "BAR",

    PIE = "PIE",

    AREA = "AREA",

    HEATMAP = "HEATMAP",

    DONUT = "DONUT"

}










/**
 * Export Status
 */
export enum ExportStatus {

    PENDING = "PENDING",

    PROCESSING = "PROCESSING",

    COMPLETED = "COMPLETED",

    FAILED = "FAILED"

}