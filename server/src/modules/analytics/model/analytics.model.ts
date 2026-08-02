/**
 * ------------------------------------------------------------------
 * File: analytics.model.ts
 * ------------------------------------------------------------------
 */

import mongoose, {

    Schema,

    Document

} from "mongoose";

import {

    IAnalytics

} from "./analytics.interface";

import {

    AnalyticsCategory,

    AnalyticsRange,

    ChartType,

    ExportStatus,

    ReportFormat

} from "./analytics.types";










export interface IAnalyticsDocument
extends IAnalytics,
Document {}










/**
 * ----------------------------------------------------------
 * Dashboard Metric Schema
 * ----------------------------------------------------------
 */
const DashboardMetricSchema = new Schema({

    title:{

        type:String,

        required:true

    },

    value:{

        type:Number,

        default:0

    },

    previousValue:Number,

    percentageChange:Number,

    trend:{

        type:String,

        enum:["UP","DOWN","STABLE"],

        default:"STABLE"

    }

});










/**
 * ----------------------------------------------------------
 * Chart Dataset Schema
 * ----------------------------------------------------------
 */
const ChartDatasetSchema = new Schema({

    label:{

        type:String,

        required:true

    },

    data:{

        type:[Number],

        default:[]

    }

});










/**
 * ----------------------------------------------------------
 * Chart Schema
 * ----------------------------------------------------------
 */
const ChartSchema = new Schema({

    title:{

        type:String,

        required:true

    },

    type:{

        type:String,

        enum:Object.values(
            ChartType
        ),

        required:true

    },

    labels:{

        type:[String],

        default:[]

    },

    datasets:{

        type:[ChartDatasetSchema],

        default:[]

    }

});










/**
 * ----------------------------------------------------------
 * Heatmap Schema
 * ----------------------------------------------------------
 */
const HeatmapSchema = new Schema({

    latitude:{

        type:Number,

        required:true

    },

    longitude:{

        type:Number,

        required:true

    },

    intensity:{

        type:Number,

        default:1

    },

    incidentCount:{

        type:Number,

        default:0

    }

});
/**
 * ----------------------------------------------------------
 * Export Report Schema
 * ----------------------------------------------------------
 */
const ExportReportSchema = new Schema({

    reportId:{

        type:String,

        required:true,

        unique:true

    },

    category:{

        type:String,

        enum:Object.values(
            AnalyticsCategory
        ),

        required:true

    },

    format:{

        type:String,

        enum:Object.values(
            ReportFormat
        ),

        required:true

    },

    status:{

        type:String,

        enum:Object.values(
            ExportStatus
        ),

        default:
        ExportStatus.PENDING

    },

    downloadUrl:String,

    generatedAt:Date

});










/**
 * ----------------------------------------------------------
 * Main Analytics Schema
 * ----------------------------------------------------------
 */
const AnalyticsSchema = new Schema(

{

    range:{

        type:String,

        enum:Object.values(
            AnalyticsRange
        ),

        required:true

    },



    dashboard:{

        type:[DashboardMetricSchema],

        default:[]

    },



    incidents:{

        total:Number,

        active:Number,

        resolved:Number,

        pending:Number,

        averageResponseTime:Number

    },



    volunteers:{

        total:Number,

        active:Number,

        assigned:Number,

        available:Number,

        averageRating:Number

    },



    hospitals:{

        total:Number,

        availableBeds:Number,

        occupiedBeds:Number,

        occupancyRate:Number

    },



    shelters:{

        total:Number,

        availableCapacity:Number,

        occupiedCapacity:Number,

        occupancyRate:Number

    },



    ngos:{

        total:Number,

        active:Number,

        volunteers:Number,

        resourcesDistributed:Number

    },



    notifications:{

        totalSent:Number,

        delivered:Number,

        failed:Number,

        read:Number

    },



    charts:{

        type:[ChartSchema],

        default:[]

    },



    heatmap:{

        type:[HeatmapSchema],

        default:[]

    },



    reports:{

        type:[ExportReportSchema],

        default:[]

    },



    generatedAt:{

        type:Date,

        default:Date.now

    },



    expiresAt:Date

},

{

    timestamps:true

}

);










/**
 * ----------------------------------------------------------
 * Indexes
 * ----------------------------------------------------------
 */
AnalyticsSchema.index({

    range:1,

    generatedAt:-1

});

AnalyticsSchema.index({

    generatedAt:-1

});

AnalyticsSchema.index({

    expiresAt:1

});










/**
 * ----------------------------------------------------------
 * TTL Index
 * ----------------------------------------------------------
 */
AnalyticsSchema.index(

    {

        expiresAt:1

    },

    {

        expireAfterSeconds:0

    }

);










export const Analytics =

mongoose.model<IAnalyticsDocument>(

    "Analytics",

    AnalyticsSchema

);