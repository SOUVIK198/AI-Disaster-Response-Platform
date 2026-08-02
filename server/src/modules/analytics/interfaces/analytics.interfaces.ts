/**
 * ------------------------------------------------------------------
 * File: analytics.interface.ts
 * ------------------------------------------------------------------
 */

import {

    AnalyticsCategory,

    AnalyticsRange,

    ChartType,

    ExportStatus,

    ReportFormat

} from "./analytics.types";










/**
 * ----------------------------------------------------------
 * Dashboard Metric
 * ----------------------------------------------------------
 */
export interface IDashboardMetric {

    title: string;

    value: number;

    previousValue?: number;

    percentageChange?: number;

    trend: "UP" | "DOWN" | "STABLE";

}










/**
 * ----------------------------------------------------------
 * Chart Dataset
 * ----------------------------------------------------------
 */
export interface IChartDataset {

    label: string;

    data: number[];

}










/**
 * ----------------------------------------------------------
 * Chart
 * ----------------------------------------------------------
 */
export interface IChart {

    title: string;

    type: ChartType;

    labels: string[];

    datasets: IChartDataset[];

}










/**
 * ----------------------------------------------------------
 * Heatmap Point
 * ----------------------------------------------------------
 */
export interface IHeatmapPoint {

    latitude: number;

    longitude: number;

    intensity: number;

    incidentCount: number;

}










/**
 * ----------------------------------------------------------
 * Incident Analytics
 * ----------------------------------------------------------
 */
export interface IIncidentAnalytics {

    total: number;

    active: number;

    resolved: number;

    pending: number;

    averageResponseTime: number;

}










/**
 * ----------------------------------------------------------
 * Volunteer Analytics
 * ----------------------------------------------------------
 */
export interface IVolunteerAnalytics {

    total: number;

    active: number;

    assigned: number;

    available: number;

    averageRating?: number;

}










/**
 * ----------------------------------------------------------
 * Hospital Analytics
 * ----------------------------------------------------------
 */
export interface IHospitalAnalytics {

    total: number;

    availableBeds: number;

    occupiedBeds: number;

    occupancyRate: number;

}










/**
 * ----------------------------------------------------------
 * Shelter Analytics
 * ----------------------------------------------------------
 */
export interface IShelterAnalytics {

    total: number;

    availableCapacity: number;

    occupiedCapacity: number;

    occupancyRate: number;

}










/**
 * ----------------------------------------------------------
 * NGO Analytics
 * ----------------------------------------------------------
 */
export interface INGOAnalytics {

    total: number;

    active: number;

    volunteers: number;

    resourcesDistributed: number;

}










/**
 * ----------------------------------------------------------
 * Notification Analytics
 * ----------------------------------------------------------
 */
export interface INotificationAnalytics {

    totalSent: number;

    delivered: number;

    failed: number;

    read: number;

}










/**
 * ----------------------------------------------------------
 * Export Report
 * ----------------------------------------------------------
 */
export interface IExportReport {

    reportId: string;

    category: AnalyticsCategory;

    format: ReportFormat;

    status: ExportStatus;

    downloadUrl?: string;

    generatedAt?: Date;

}










/**
 * ----------------------------------------------------------
 * Main Analytics Interface
 * ----------------------------------------------------------
 */
export interface IAnalytics {

    range: AnalyticsRange;

    dashboard: IDashboardMetric[];

    incidents: IIncidentAnalytics;

    volunteers: IVolunteerAnalytics;

    hospitals: IHospitalAnalytics;

    shelters: IShelterAnalytics;

    ngos: INGOAnalytics;

    notifications: INotificationAnalytics;

    charts: IChart[];

    heatmap: IHeatmapPoint[];

    reports: IExportReport[];

    generatedAt: Date;

}