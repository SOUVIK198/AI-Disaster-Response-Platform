/**
 * ------------------------------------------------------------------
 * File: notification.types.ts
 * ------------------------------------------------------------------
 */

/**
 * Notification Channel
 */
export enum NotificationChannel {

    IN_APP = "IN_APP",

    EMAIL = "EMAIL",

    SMS = "SMS",

    PUSH = "PUSH",

    WEBHOOK = "WEBHOOK"

}









/**
 * Notification Priority
 */
export enum NotificationPriority {

    LOW = "LOW",

    NORMAL = "NORMAL",

    HIGH = "HIGH",

    CRITICAL = "CRITICAL"

}









/**
 * Notification Status
 */
export enum NotificationStatus {

    PENDING = "PENDING",

    PROCESSING = "PROCESSING",

    SENT = "SENT",

    DELIVERED = "DELIVERED",

    FAILED = "FAILED",

    READ = "READ"

}









/**
 * Notification Type
 */
export enum NotificationType {

    INCIDENT_CREATED = "INCIDENT_CREATED",

    INCIDENT_UPDATED = "INCIDENT_UPDATED",

    INCIDENT_RESOLVED = "INCIDENT_RESOLVED",

    VOLUNTEER_ASSIGNED = "VOLUNTEER_ASSIGNED",

    NGO_ASSIGNED = "NGO_ASSIGNED",

    HOSPITAL_ASSIGNED = "HOSPITAL_ASSIGNED",

    SHELTER_ASSIGNED = "SHELTER_ASSIGNED",

    DONATION_RECEIVED = "DONATION_RECEIVED",

    INVENTORY_LOW = "INVENTORY_LOW",

    EMERGENCY_ALERT = "EMERGENCY_ALERT",

    SYSTEM = "SYSTEM"

}









/**
 * Recipient Type
 */
export enum RecipientType {

    USER = "USER",

    VOLUNTEER = "VOLUNTEER",

    NGO = "NGO",

    HOSPITAL = "HOSPITAL",

    SHELTER = "SHELTER",

    ADMIN = "ADMIN",

    ALL = "ALL"

}









/**
 * Template Type
 */
export enum TemplateType {

    EMAIL = "EMAIL",

    SMS = "SMS",

    PUSH = "PUSH",

    IN_APP = "IN_APP"

}









/**
 * Retry Status
 */
export enum RetryStatus {

    NONE = "NONE",

    RETRYING = "RETRYING",

    EXHAUSTED = "EXHAUSTED"

}