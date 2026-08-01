/**
 * ------------------------------------------------------------------
 * File: hospital.validation.ts
 *
 * Zod Validation Schemas
 *
 * ------------------------------------------------------------------
 */


import { z } from "zod";


import {

    HospitalType,

    HospitalStatus,

    BedType,

    BloodGroup,

    AmbulanceStatus,

    DepartmentType,

    EmergencyLevel

} from "./hospital.types";









/**
 * Location Validation
 */
export const locationSchema =

z.object({



    type:

    z.literal("Point")
    .default("Point"),




    coordinates:

    z.tuple([


        z.number()

        .min(-180)

        .max(180),



        z.number()

        .min(-90)

        .max(90)



    ]),





    address:

    z.string()
    .min(5),




    city:

    z.string()
    .min(2),




    district:

    z.string()
    .optional(),




    state:

    z.string()
    .optional(),




    country:

    z.string()
    .default("India")



});









/**
 * Bed Validation
 */
export const bedSchema =

z.object({



    type:

    z.nativeEnum(

        BedType

    ),




    total:

    z.number()
    .min(0),




    available:

    z.number()
    .min(0),




    occupied:

    z.number()
    .min(0)



});









/**
 * ICU Validation
 */
export const icuSchema =

z.object({



    totalBeds:

    z.number()
    .min(0),




    availableBeds:

    z.number()
    .min(0),




    ventilators:

    z.number()
    .min(0),




    availableVentilators:

    z.number()
    .min(0)



});









/**
 * Blood Inventory Validation
 */
export const bloodInventorySchema =

z.object({



    bloodGroup:

    z.nativeEnum(

        BloodGroup

    ),




    units:

    z.number()
    .min(0)



});









/**
 * Ambulance Validation
 */
export const ambulanceSchema =

z.object({



    ambulanceNumber:

    z.string()
    .min(3),




    status:

    z.nativeEnum(

        AmbulanceStatus

    ),




    driverName:

    z.string()
    .optional(),




    driverPhone:

    z.string()
    .optional()



});









/**
 * Create Hospital Schema
 */
export const createHospitalSchema =

z.object({



    name:

    z.string()
    .min(3),




    registrationNumber:

    z.string()
    .min(3),




    type:

    z.nativeEnum(

        HospitalType

    ),




    location:

    locationSchema,




    phone:

    z.string()
    .min(10),




    email:

    z.string()
    .email(),




    departments:

    z.array(

        z.nativeEnum(

            DepartmentType

        )

    )
    .default([]),




    beds:

    z.array(

        bedSchema

    )
    .default([]),




    icu:

    icuSchema,




    bloodInventory:

    z.array(

        bloodInventorySchema

    )
    .default([]),




    ambulances:

    z.array(

        ambulanceSchema

    )
    .default([]),




    emergencyCapacity:

    z.object({



        currentPatients:

        z.number()
        .min(0)
        .default(0),




        maximumCapacity:

        z.number()
        .min(1),




        emergencyLevel:

        z.nativeEnum(

            EmergencyLevel

        ),




        acceptingPatients:

        z.boolean()
        .default(true)



    })



});
/**
 * Update Hospital Schema
 */
export const updateHospitalSchema =

z.object({



    name:

    z.string()
    .min(3)
    .optional(),




    phone:

    z.string()
    .min(10)
    .optional(),




    email:

    z.string()
    .email()
    .optional(),




    status:

    z.nativeEnum(

        HospitalStatus

    )
    .optional()



});









/**
 * Update Bed Availability
 */
export const updateBedSchema =

z.object({



    bedType:

    z.nativeEnum(

        BedType

    ),




    available:

    z.number()
    .min(0)



});









/**
 * Allocate / Release Bed
 */
export const bedOperationSchema =

z.object({



    bedType:

    z.nativeEnum(

        BedType

    )



});









/**
 * Update ICU Schema
 */
export const updateICUSchema =

z.object({



    totalBeds:

    z.number()
    .min(0)
    .optional(),




    availableBeds:

    z.number()
    .min(0)
    .optional(),




    ventilators:

    z.number()
    .min(0)
    .optional(),




    availableVentilators:

    z.number()
    .min(0)
    .optional()



});









/**
 * Update Blood Inventory
 */
export const updateBloodSchema =

z.object({



    bloodGroup:

    z.nativeEnum(

        BloodGroup

    ),




    units:

    z.number()
    .min(0)



});









/**
 * Update Ambulance
 */
export const updateAmbulanceSchema =

z.object({



    ambulanceNumber:

    z.string()
    .min(3),




    status:

    z.nativeEnum(

        AmbulanceStatus

    )



});









/**
 * Nearby Hospital Search
 */
export const nearbyHospitalSchema =

z.object({



    longitude:

    z.coerce
    .number()
    .min(-180)
    .max(180),




    latitude:

    z.coerce
    .number()
    .min(-90)
    .max(90),




    radius:

    z.coerce
    .number()
    .positive()
    .optional()



});









/**
 * Best Hospital Search
 */
export const bestHospitalSchema =

z.object({



    longitude:

    z.coerce
    .number(),




    latitude:

    z.coerce
    .number(),




    emergencyLevel:

    z.nativeEnum(

        EmergencyLevel

    )



});









/**
 * Patient Admission
 */
export const patientAdmissionSchema =

z.object({



    emergencyLevel:

    z.nativeEnum(

        EmergencyLevel

    )

    .optional()



});









/**
 * Export All Validators
 */
export const hospitalValidators = {


    createHospitalSchema,


    updateHospitalSchema,


    updateBedSchema,


    bedOperationSchema,


    updateICUSchema,


    updateBloodSchema,


    updateAmbulanceSchema,


    nearbyHospitalSchema,


    bestHospitalSchema,


    patientAdmissionSchema


};