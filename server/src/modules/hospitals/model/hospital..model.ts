/**
 * ------------------------------------------------------------------
 * File: hospital.model.ts
 *
 * MongoDB Schema for Hospital Module
 *
 * ------------------------------------------------------------------
 */


import mongoose, {

    Schema,

    Document

} from "mongoose";



import {

    IHospital

} from "./hospital.interface";



import {

    HospitalType,

    HospitalStatus,

    HospitalVerificationStatus,

    BedType,

    AmbulanceStatus,

    BloodGroup,

    EmergencyLevel,

    DepartmentType,

    MedicalStaffRole

} from "./hospital.types";






export interface IHospitalDocument
extends IHospital,
Document {}








/**
 * Location Schema
 */
const LocationSchema =
new Schema({


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
 * Bed Schema
 */
const BedSchema =
new Schema({


    type:{


        type:String,

        enum:Object.values(BedType),

        required:true


    },


    total:{


        type:Number,

        default:0


    },


    available:{


        type:Number,

        default:0


    },


    occupied:{


        type:Number,

        default:0


    }


});









/**
 * ICU Schema
 */
const ICUSchema =
new Schema({


    totalBeds:{


        type:Number,

        default:0


    },


    availableBeds:{


        type:Number,

        default:0


    },


    ventilators:{


        type:Number,

        default:0


    },


    availableVentilators:{


        type:Number,

        default:0


    }


});









/**
 * Blood Inventory Schema
 */
const BloodInventorySchema =
new Schema({


    bloodGroup:{


        type:String,

        enum:Object.values(BloodGroup),

        required:true


    },


    units:{


        type:Number,

        default:0


    },


    lastUpdated:{


        type:Date,

        default:Date.now


    }


});









/**
 * Ambulance Schema
 */
const AmbulanceSchema =
new Schema({


    ambulanceNumber:{


        type:String,

        required:true


    },


    status:{


        type:String,

        enum:Object.values(AmbulanceStatus),

        default:
        AmbulanceStatus.AVAILABLE


    },


    driverName:String,


    driverPhone:String



});









/**
 * Medical Staff Schema
 */
const MedicalStaffSchema =
new Schema({


    name:String,


    role:{


        type:String,

        enum:Object.values(MedicalStaffRole)


    },


    specialization:{


        type:String,

        enum:Object.values(DepartmentType)


    },


    experience:Number,


    available:{


        type:Boolean,

        default:true


    }


});









/**
 * Emergency Capacity Schema
 */
const EmergencyCapacitySchema =
new Schema({


    currentPatients:{


        type:Number,

        default:0


    },


    maximumCapacity:{


        type:Number,

        default:0


    },


    emergencyLevel:{


        type:String,

        enum:Object.values(EmergencyLevel),

        default:
        EmergencyLevel.LOW


    },


    acceptingPatients:{


        type:Boolean,

        default:true


    }


});









/**
 * Main Hospital Schema
 */
const HospitalSchema =
new Schema(


{

    name:{


        type:String,

        required:true,

        trim:true


    },



    registrationNumber:{


        type:String,

        required:true,

        unique:true


    },



    type:{


        type:String,

        enum:Object.values(HospitalType),

        required:true


    },



    status:{


        type:String,

        enum:Object.values(HospitalStatus),

        default:
        HospitalStatus.ACTIVE


    },



    verificationStatus:{


        type:String,

        enum:Object.values(
            HospitalVerificationStatus
        ),


        default:
        HospitalVerificationStatus.PENDING


    },



    location:{


        type:LocationSchema,

        required:true


    },



    phone:String,


    email:String,


    website:String,



    departments:[


        {

            type:String,

            enum:Object.values(
                DepartmentType
            )


        }

    ],



    beds:[

        BedSchema

    ],



    icu:ICUSchema,



    bloodInventory:[

        BloodInventorySchema

    ],



    ambulances:[

        AmbulanceSchema

    ],



    medicalStaff:[

        MedicalStaffSchema

    ],



    emergencyCapacity:

    EmergencyCapacitySchema,



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
 * GeoSpatial Index
 *
 * Required for:
 *
 * $near
 * $geoNear
 */
HospitalSchema.index({

    location:"2dsphere"

});









export const Hospital =

mongoose.model<IHospitalDocument>(

    "Hospital",

    HospitalSchema

);