/**
 * ------------------------------------------------------------------
 * File: notification.model.ts
 * ------------------------------------------------------------------
 */

import mongoose, {

    Schema,

    Document

} from "mongoose";

import {

    INotification

} from "./notification.interface";

import {

    NotificationChannel,

    NotificationPriority,

    NotificationStatus,

    NotificationType,

    RecipientType,

    RetryStatus

} from "./notification.types";









export interface INotificationDocument
extends INotification,
Document {}









/**
 * ----------------------------------------------------------
 * Recipient Schema
 * ----------------------------------------------------------
 */
const RecipientSchema = new Schema({

    userId:{

        type:String,

        required:true

    },

    recipientType:{

        type:String,

        enum:Object.values(
            RecipientType
        ),

        required:true

    },

    name:String,

    email:String,

    phone:String,

    deviceToken:String

});









/**
 * ----------------------------------------------------------
 * Notification Payload
 * ----------------------------------------------------------
 */
const PayloadSchema = new Schema({

    title:{

        type:String,

        required:true

    },

    message:{

        type:String,

        required:true

    },

    imageUrl:String,

    actionUrl:String,

    metadata:{

        type:Schema.Types.Mixed,

        default:{}

    }

});









/**
 * ----------------------------------------------------------
 * Delivery Schema
 * ----------------------------------------------------------
 */
const DeliverySchema = new Schema({

    channel:{

        type:String,

        enum:Object.values(
            NotificationChannel
        ),

        required:true

    },

    status:{

        type:String,

        enum:Object.values(
            NotificationStatus
        ),

        default:
        NotificationStatus.PENDING

    },

    provider:String,

    providerMessageId:String,

    sentAt:Date,

    deliveredAt:Date,

    readAt:Date,

    failureReason:String

});









/**
 * ----------------------------------------------------------
 * Retry Schema
 * ----------------------------------------------------------
 */
const RetrySchema = new Schema({

    retryStatus:{

        type:String,

        enum:Object.values(
            RetryStatus
        ),

        default:
        RetryStatus.NONE

    },

    retryCount:{

        type:Number,

        default:0

    },

    maxRetry:{

        type:Number,

        default:3

    },

    nextRetryAt:Date

});
/**
 * ----------------------------------------------------------
 * Main Notification Schema
 * ----------------------------------------------------------
 */
const NotificationSchema = new Schema(

{

    notificationId:{

        type:String,

        required:true,

        unique:true,

        trim:true

    },



    type:{

        type:String,

        enum:Object.values(
            NotificationType
        ),

        required:true

    },



    priority:{

        type:String,

        enum:Object.values(
            NotificationPriority
        ),

        default:
        NotificationPriority.NORMAL

    },



    recipient:{

        type:RecipientSchema,

        required:true

    },



    payload:{

        type:PayloadSchema,

        required:true

    },



    delivery:{

        type:DeliverySchema,

        required:true

    },



    retry:{

        type:RetrySchema,

        default:() => ({})

    },



    scheduledFor:Date,



    expiresAt:Date,



    isBroadcast:{

        type:Boolean,

        default:false

    },



    templateName:String,



    createdBy:{

        type:Schema.Types.ObjectId,

        ref:"User"

    }

},

{

    timestamps:true

}

);









/**
 * ----------------------------------------------------------
 * Performance Indexes
 * ----------------------------------------------------------
 */
NotificationSchema.index({

    notificationId:1

});

NotificationSchema.index({

    "recipient.userId":1

});

NotificationSchema.index({

    "delivery.status":1

});

NotificationSchema.index({

    type:1,

    priority:1

});

NotificationSchema.index({

    scheduledFor:1

});

NotificationSchema.index({

    createdAt:-1

});









/**
 * ----------------------------------------------------------
 * TTL Index
 *
 * Expired notifications will be automatically removed.
 * MongoDB's TTL monitor runs approximately once per minute.
 * ----------------------------------------------------------
 */
NotificationSchema.index(

    {

        expiresAt:1

    },

    {

        expireAfterSeconds:0

    }

);









/**
 * ----------------------------------------------------------
 * Compound Analytics Index
 * ----------------------------------------------------------
 */
NotificationSchema.index({

    "recipient.userId":1,

    "delivery.status":1,

    createdAt:-1

});









export const Notification =

mongoose.model<INotificationDocument>(

    "Notification",

    NotificationSchema

);