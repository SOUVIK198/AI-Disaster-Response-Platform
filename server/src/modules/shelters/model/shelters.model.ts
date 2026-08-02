/**
 * ------------------------------------------------------------------
 * File: shelter.model.ts
 *
 * MongoDB Schema for Shelter Module
 *
 * ------------------------------------------------------------------
 */

import mongoose,{
    Schema,
    Document
} from "mongoose";

import { IShelter } from "./shelter.interface";

import {
    ShelterType,
    ShelterStatus,
    ShelterVerificationStatus,
    OccupancyStatus,
    ResourceType,
    ResourceUnit,
    FacilityType,
    EvacuationPriority,
    ShelterStaffRole
} from "./shelter.types";

export interface IShelterDocument
extends IShelter,
Document {}









/**
 * Location Schema
 */
const LocationSchema = new Schema({

    type:{
        type:String,
        enum:["Point"],
        default:"Point"
    },

    coordinates:{
        type:[Number],
        required:true
    },

    address:String,

    city:String,

    district:String,

    state:String,

    country:String

});









/**
 * Contact Schema
 */
const ContactSchema = new Schema({

    phone:{
        type:String,
        required:true
    },

    alternatePhone:String,

    email:String

});









/**
 * Capacity Schema
 */
const CapacitySchema = new Schema({

    totalCapacity:{
        type:Number,
        required:true
    },

    currentOccupancy:{
        type:Number,
        default:0
    },

    availableCapacity:{
        type:Number,
        required:true
    },

    occupancyStatus:{
        type:String,
        enum:Object.values(OccupancyStatus),
        default:OccupancyStatus.AVAILABLE
    }

});









/**
 * Resource Schema
 */
const ResourceSchema = new Schema({

    type:{
        type:String,
        enum:Object.values(ResourceType),
        required:true
    },

    quantity:{
        type:Number,
        default:0
    },

    unit:{
        type:String,
        enum:Object.values(ResourceUnit),
        required:true
    },

    minimumRequired:{
        type:Number,
        default:0
    },

    lastUpdated:{
        type:Date,
        default:Date.now
    }

});
/**
 * ----------------------------------------------------------
 * Facility Schema
 * ----------------------------------------------------------
 */
const FacilitySchema = new Schema({

    type:{

        type:String,

        enum:Object.values(FacilityType),

        required:true

    },

    available:{

        type:Boolean,

        default:true

    },

    quantity:{

        type:Number,

        default:1

    }

});









/**
 * ----------------------------------------------------------
 * Staff Schema
 * ----------------------------------------------------------
 */
const StaffSchema = new Schema({

    name:{

        type:String,

        required:true

    },

    role:{

        type:String,

        enum:Object.values(ShelterStaffRole),

        required:true

    },

    phone:String,

    available:{

        type:Boolean,

        default:true

    }

});









/**
 * ----------------------------------------------------------
 * Evacuation Schema
 * ----------------------------------------------------------
 */
const EvacuationSchema = new Schema({

    priority:{

        type:String,

        enum:Object.values(EvacuationPriority),

        default:EvacuationPriority.MEDIUM

    },

    nearestSafeZone:String,

    evacuationRoute:String,

    transportAvailable:{

        type:Boolean,

        default:true

    }

});









/**
 * ----------------------------------------------------------
 * Main Shelter Schema
 * ----------------------------------------------------------
 */
const ShelterSchema = new Schema(

{

    name:{

        type:String,

        required:true,

        trim:true

    },



    shelterCode:{

        type:String,

        required:true,

        unique:true

    },



    type:{

        type:String,

        enum:Object.values(ShelterType),

        required:true

    },



    status:{

        type:String,

        enum:Object.values(ShelterStatus),

        default:ShelterStatus.ACTIVE

    },



    verificationStatus:{

        type:String,

        enum:Object.values(
            ShelterVerificationStatus
        ),

        default:
        ShelterVerificationStatus.PENDING

    },



    location:{

        type:LocationSchema,

        required:true

    },



    contact:{

        type:ContactSchema,

        required:true

    },



    capacity:{

        type:CapacitySchema,

        required:true

    },



    resources:[

        ResourceSchema

    ],



    facilities:[

        FacilitySchema

    ],



    staff:[

        StaffSchema

    ],



    evacuation:{

        type:EvacuationSchema,

        required:true

    },



    managedBy:{

        type:String,

        required:true

    },



    acceptsPets:{

        type:Boolean,

        default:false

    },



    acceptsSpecialNeeds:{

        type:Boolean,

        default:true

    },



    isActive:{

        type:Boolean,

        default:true

    }

},

{

    timestamps:true

}

);









/**
 * ----------------------------------------------------------
 * GeoSpatial Index
 * Required for:
 * $near
 * $geoNear
 * ----------------------------------------------------------
 */
ShelterSchema.index({

    location:"2dsphere"

});









export const Shelter =

mongoose.model<IShelterDocument>(

    "Shelter",

    ShelterSchema

);