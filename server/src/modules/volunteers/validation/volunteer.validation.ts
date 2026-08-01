/**
 * ------------------------------------------------------------------
 * File: volunteer.validation.ts
 *
 * Request validation using Zod
 *
 * Used by:
 * validation.middleware.ts
 * ------------------------------------------------------------------
 */


import { z } from "zod";


import {
    VolunteerRole,
    VolunteerStatus,
    SkillType,
    CertificationType,
    VehicleType,
    ShiftType,
    BloodGroup,
    AvailabilityStatus
} from "./volunteer.types";





/**
 * Geo location validation
 */
export const locationSchema = z.object({

    type:z
    .literal("Point")
    .default("Point"),


    coordinates:z
    .tuple([

        z.number()
        .min(-180)
        .max(180),


        z.number()
        .min(-90)
        .max(90)

    ]),


    address:z.string()
    .optional(),


    city:z.string()
    .optional(),


    district:z.string()
    .optional(),


    state:z.string()
    .optional(),


    country:z.string()
    .optional()


});









/**
 * Skill validation
 */
export const skillSchema = z.object({

    name:z.nativeEnum(
        SkillType
    ),


    level:z.number()
    .min(1)
    .max(5),


    experienceInYears:z.number()
    .min(0)
    .optional()

});









/**
 * Certification validation
 */
export const certificationSchema =
z.object({


    name:z.nativeEnum(
        CertificationType
    ),


    issuedBy:z.string()
    .min(2),


    certificateId:z.string()
    .optional(),


    issuedAt:z.coerce
    .date()
    .optional(),


    expiresAt:z.coerce
    .date()
    .optional()


});









/**
 * Vehicle validation
 */
export const vehicleSchema =
z.object({

    type:z.nativeEnum(
        VehicleType
    ),


    vehicleNumber:z.string()
    .optional(),


    drivingLicenseNumber:z.string()
    .optional()

});









/**
 * Availability validation
 */
export const availabilitySchema =
z.object({

    status:z.nativeEnum(
        AvailabilityStatus
    ),


    shift:z.nativeEnum(
        ShiftType
    ),


    availableFrom:z.coerce
    .date()
    .optional(),


    availableUntil:z.coerce
    .date()
    .optional()

});









/**
 * Create Volunteer Schema
 */
export const createVolunteerSchema =
z.object({



    user:z.string()
    .min(1),



    role:z.nativeEnum(
        VolunteerRole
    )
    .default(
        VolunteerRole.VOLUNTEER
    ),




    location:
    locationSchema,




    skills:
    z.array(skillSchema)
    .max(15)
    .default([]),




    certifications:
    z.array(certificationSchema)
    .max(10)
    .default([]),




    availability:
    availabilitySchema,




    emergencyContact:
    z.object({

        name:z.string(),

        relationship:z.string(),

        phone:z.string()

    }),





    vehicle:
    vehicleSchema
    .optional(),




    bloodGroup:
    z.nativeEnum(
        BloodGroup
    )
    .optional(),




    gender:
    z.string()
    .optional(),




    age:
    z.number()
    .min(18)
    .max(70)
    .optional(),




    languages:
    z.array(
        z.string()
    )
    .default([])

});
/**
 * ------------------------------------------------------------------
 * File: volunteer.validation.ts
 *
 * Request validation using Zod
 *
 * Used by:
 * validation.middleware.ts
 * ------------------------------------------------------------------
 */


import { z } from "zod";


import {
    VolunteerRole,
    VolunteerStatus,
    SkillType,
    CertificationType,
    VehicleType,
    ShiftType,
    BloodGroup,
    AvailabilityStatus
} from "./volunteer.types";





/**
 * Geo location validation
 */
export const locationSchema = z.object({

    type:z
    .literal("Point")
    .default("Point"),


    coordinates:z
    .tuple([

        z.number()
        .min(-180)
        .max(180),


        z.number()
        .min(-90)
        .max(90)

    ]),


    address:z.string()
    .optional(),


    city:z.string()
    .optional(),


    district:z.string()
    .optional(),


    state:z.string()
    .optional(),


    country:z.string()
    .optional()


});









/**
 * Skill validation
 */
export const skillSchema = z.object({

    name:z.nativeEnum(
        SkillType
    ),


    level:z.number()
    .min(1)
    .max(5),


    experienceInYears:z.number()
    .min(0)
    .optional()

});









/**
 * Certification validation
 */
export const certificationSchema =
z.object({


    name:z.nativeEnum(
        CertificationType
    ),


    issuedBy:z.string()
    .min(2),


    certificateId:z.string()
    .optional(),


    issuedAt:z.coerce
    .date()
    .optional(),


    expiresAt:z.coerce
    .date()
    .optional()


});









/**
 * Vehicle validation
 */
export const vehicleSchema =
z.object({

    type:z.nativeEnum(
        VehicleType
    ),


    vehicleNumber:z.string()
    .optional(),


    drivingLicenseNumber:z.string()
    .optional()

});









/**
 * Availability validation
 */
export const availabilitySchema =
z.object({

    status:z.nativeEnum(
        AvailabilityStatus
    ),


    shift:z.nativeEnum(
        ShiftType
    ),


    availableFrom:z.coerce
    .date()
    .optional(),


    availableUntil:z.coerce
    .date()
    .optional()

});









/**
 * Create Volunteer Schema
 */
export const createVolunteerSchema =
z.object({



    user:z.string()
    .min(1),



    role:z.nativeEnum(
        VolunteerRole
    )
    .default(
        VolunteerRole.VOLUNTEER
    ),




    location:
    locationSchema,




    skills:
    z.array(skillSchema)
    .max(15)
    .default([]),




    certifications:
    z.array(certificationSchema)
    .max(10)
    .default([]),




    availability:
    availabilitySchema,




    emergencyContact:
    z.object({

        name:z.string(),

        relationship:z.string(),

        phone:z.string()

    }),





    vehicle:
    vehicleSchema
    .optional(),




    bloodGroup:
    z.nativeEnum(
        BloodGroup
    )
    .optional(),




    gender:
    z.string()
    .optional(),




    age:
    z.number()
    .min(18)
    .max(70)
    .optional(),




    languages:
    z.array(
        z.string()
    )
    .default([])

});