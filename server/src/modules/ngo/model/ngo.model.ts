/**
 * ------------------------------------------------------------------
 * File: ngo.model.ts
 *
 * MongoDB Schema for NGO Module
 * ------------------------------------------------------------------
 */

import mongoose,{
    Schema,
    Document
} from "mongoose";

import { INGO } from "./ngo.interface";

import {

    NGOType,

    NGOStatus,

    VerificationStatus,

    ReliefCategory,

    DonationType,

    InventoryUnit,

    VolunteerAssignmentStatus,

    DisasterPriority,

    NGOStaffRole,

    VehicleType

} from "./ngo.types";



export interface INGODocument
extends INGO,
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

    email:{

        type:String,

        required:true

    },

    website:String

});









/**
 * Relief Inventory Schema
 */
const InventorySchema = new Schema({

    category:{

        type:String,

        enum:Object.values(
            ReliefCategory
        ),

        required:true

    },

    quantity:{

        type:Number,

        default:0

    },

    unit:{

        type:String,

        enum:Object.values(
            InventoryUnit
        ),

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
 * Staff Schema
 */
const StaffSchema = new Schema({

    name:{

        type:String,

        required:true

    },

    role:{

        type:String,

        enum:Object.values(
            NGOStaffRole
        ),

        required:true

    },

    phone:String,

    email:String,

    available:{

        type:Boolean,

        default:true

    }

});
/**
 * ----------------------------------------------------------
 * Vehicle Schema
 * ----------------------------------------------------------
 */
const VehicleSchema = new Schema({

    vehicleNumber:{

        type:String,

        required:true,

        trim:true

    },

    type:{

        type:String,

        enum:Object.values(
            VehicleType
        ),

        required:true

    },

    driverName:{

        type:String,

        required:true

    },

    capacity:{

        type:Number,

        required:true,

        min:1

    },

    available:{

        type:Boolean,

        default:true

    },

    currentLocation:{

        type:LocationSchema,

        required:false

    }

});









/**
 * ----------------------------------------------------------
 * Disaster Assignment Schema
 * ----------------------------------------------------------
 */
const AssignmentSchema = new Schema({

    incidentId:{

        type:Schema.Types.ObjectId,

        ref:"Incident",

        required:true

    },

    priority:{

        type:String,

        enum:Object.values(
            DisasterPriority
        ),

        default:DisasterPriority.MEDIUM

    },

    assignedAt:{

        type:Date,

        default:Date.now

    },

    completedAt:Date,

    status:{

        type:String,

        enum:Object.values(
            VolunteerAssignmentStatus
        ),

        default:
        VolunteerAssignmentStatus.ASSIGNED

    }

});









/**
 * ----------------------------------------------------------
 * Donation Schema
 * ----------------------------------------------------------
 */
const DonationSchema = new Schema({

    donorName:{

        type:String,

        required:true

    },

    donationType:{

        type:String,

        enum:Object.values(
            DonationType
        ),

        required:true

    },

    amount:Number,

    quantity:Number,

    unit:{

        type:String,

        enum:Object.values(
            InventoryUnit
        )

    },

    donatedAt:{

        type:Date,

        default:Date.now

    }

});









/**
 * ----------------------------------------------------------
 * Operational Area Schema
 * ----------------------------------------------------------
 */
const OperationalAreaSchema = new Schema({

    state:{

        type:String,

        required:true

    },

    district:{

        type:String,

        required:true

    },

    city:{

        type:String,

        required:true

    }

});









/**
 * ----------------------------------------------------------
 * Main NGO Schema
 * ----------------------------------------------------------
 */
const NGOSchema = new Schema(

{

    ngoCode:{

        type:String,

        required:true,

        unique:true,

        trim:true

    },



    name:{

        type:String,

        required:true,

        trim:true

    },



    description:String,



    type:{

        type:String,

        enum:Object.values(
            NGOType
        ),

        required:true

    },



    status:{

        type:String,

        enum:Object.values(
            NGOStatus
        ),

        default:NGOStatus.ACTIVE

    },



    verificationStatus:{

        type:String,

        enum:Object.values(
            VerificationStatus
        ),

        default:
        VerificationStatus.PENDING

    },



    location:{

        type:LocationSchema,

        required:true

    },



    contact:{

        type:ContactSchema,

        required:true

    },



    inventory:[

        InventorySchema

    ],



    staff:[

        StaffSchema

    ],



    vehicles:[

        VehicleSchema

    ],



    assignments:[

        AssignmentSchema

    ],



    donations:[

        DonationSchema

    ],



    operationalAreas:[

        OperationalAreaSchema

    ],



    managedBy:{

        type:Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    totalVolunteers:{

        type:Number,

        default:0

    },



    activeVolunteers:{

        type:Number,

        default:0

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
 * ----------------------------------------------------------
 */
NGOSchema.index({

    location:"2dsphere"

});









/**
 * Helpful Secondary Indexes
 */
NGOSchema.index({

    ngoCode:1

});

NGOSchema.index({

    status:1,

    verificationStatus:1

});

NGOSchema.index({

    type:1

});









export const NGO =

mongoose.model<INGODocument>(

    "NGO",

    NGOSchema

);