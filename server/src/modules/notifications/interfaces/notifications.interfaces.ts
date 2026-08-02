/**
 * ------------------------------------------------------------------
 * File: notification.interface.ts
 * ------------------------------------------------------------------
 */

import {

    NotificationChannel,

    NotificationPriority,

    NotificationStatus,

    NotificationType,

    RecipientType,

    TemplateType,

    RetryStatus

} from "./notification.types";









/**
 * ----------------------------------------------------------
 * Recipient
 * ----------------------------------------------------------
 */
export interface IRecipient {

    userId: string;

    recipientType: RecipientType;

    name?: string;

    email?: string;

    phone?: string;

    deviceToken?: string;

}









/**
 * ----------------------------------------------------------
 * Notification Payload
 * ----------------------------------------------------------
 */
export interface INotificationPayload {

    title: string;

    message: string;

    imageUrl?: string;

    actionUrl?: string;

    metadata?: Record<string, any>;

}









/**
 * ----------------------------------------------------------
 * Delivery Information
 * ----------------------------------------------------------
 */
export interface IDeliveryInfo {

    channel: NotificationChannel;

    status: NotificationStatus;

    provider?: string;

    providerMessageId?: string;

    sentAt?: Date;

    deliveredAt?: Date;

    readAt?: Date;

    failureReason?: string;

}









/**
 * ----------------------------------------------------------
 * Retry Information
 * ----------------------------------------------------------
 */
export interface IRetryInfo {

    retryStatus: RetryStatus;

    retryCount: number;

    maxRetry: number;

    nextRetryAt?: Date;

}









/**
 * ----------------------------------------------------------
 * Notification Preferences
 * ----------------------------------------------------------
 */
export interface INotificationPreference {

    email: boolean;

    sms: boolean;

    push: boolean;

    inApp: boolean;

    emergencyOverride: boolean;

}









/**
 * ----------------------------------------------------------
 * Notification Template
 * ----------------------------------------------------------
 */
export interface INotificationTemplate {

    name: string;

    type: TemplateType;

    subject?: string;

    body: string;

    variables: string[];

}









/**
 * ----------------------------------------------------------
 * Notification Analytics
 * ----------------------------------------------------------
 */
export interface INotificationAnalytics {

    totalSent: number;

    totalDelivered: number;

    totalFailed: number;

    totalRead: number;

    deliveryRate: number;

    readRate: number;

}









/**
 * ----------------------------------------------------------
 * Main Notification Interface
 * ----------------------------------------------------------
 */
export interface INotification {

    _id?: string;

    notificationId: string;

    type: NotificationType;

    priority: NotificationPriority;

    recipient: IRecipient;

    payload: INotificationPayload;

    delivery: IDeliveryInfo;

    retry: IRetryInfo;

    scheduledFor?: Date;

    expiresAt?: Date;

    isBroadcast: boolean;

    templateName?: string;

    createdBy?: string;

    createdAt?: Date;

    updatedAt?: Date;

}