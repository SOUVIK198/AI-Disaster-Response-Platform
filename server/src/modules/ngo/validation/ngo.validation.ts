/**
 * ------------------------------------------------------------------
 * File: ngo.validation.ts
 * ------------------------------------------------------------------
 */

import { z } from "zod";

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









/**
 * ----------------------------------------------------------
 * Location
 * ----------------------------------------------------------
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

    z.string().min(5),

    city:

    z.string().min(2),

    district:

    z.string().min(2),

    state:

    z.string().min(2),

    country:

    z.string()
    .default("India")

});









/**
 * ----------------------------------------------------------
 * Contact
 * ----------------------------------------------------------
 */
export const contactSchema =

z.object({

    phone:

    z.string().min(10),

    alternatePhone:

    z.string().optional(),

    email:

    z.string().email(),

    website:

    z.string().url().optional()

});









/**
 * ----------------------------------------------------------
 * Inventory
 * ----------------------------------------------------------
 */
export const inventorySchema =

z.object({

    category:

    z.nativeEnum(
        ReliefCategory
    ),

    quantity:

    z.number()
    .min(0),

    unit:

    z.nativeEnum(
        InventoryUnit
    ),

    minimumRequired:

    z.number()
    .min(0)

});









/**
 * ----------------------------------------------------------
 * Staff
 * ----------------------------------------------------------
 */
export const staffSchema =

z.object({

    name:

    z.string().min(2),

    role:

    z.nativeEnum(
        NGOStaffRole
    ),

    phone:

    z.string().min(10),

    email:

    z.string()
    .email()
    .optional(),

    available:

    z.boolean()

});









/**
 * ----------------------------------------------------------
 * Vehicle
 * ----------------------------------------------------------
 */
export const vehicleSchema =

z.object({

    vehicleNumber:

    z.string().min(4),

    type:

    z.nativeEnum(
        VehicleType
    ),

    driverName:

    z.string().min(2),

    capacity:

    z.number()
    .positive(),

    available:

    z.boolean()

});









/**
 * ----------------------------------------------------------
 * Assignment
 * ----------------------------------------------------------
 */
export const assignmentSchema =

z.object({

    incidentId:

    z.string(),

    priority:

    z.nativeEnum(
        DisasterPriority
    ),

    status:

    z.nativeEnum(
        VolunteerAssignmentStatus
    ).optional()

});









/**
 * ----------------------------------------------------------
 * Donation
 * ----------------------------------------------------------
 */
export const donationSchema =

z.object({

    donorName:

    z.string().min(2),

    donationType:

    z.nativeEnum(
        DonationType
    ),

    amount:

    z.number()
    .optional(),

    quantity:

    z.number()
    .optional(),

    unit:

    z.nativeEnum(
        InventoryUnit
    ).optional()

});









/**
 * ----------------------------------------------------------
 * Create NGO
 * ----------------------------------------------------------
 */
export const createNGOSchema =

z.object({

    ngoCode:

    z.string().min(3),

    name:

    z.string().min(3),

    description:

    z.string().optional(),

    type:

    z.nativeEnum(
        NGOType
    ),

    status:

    z.nativeEnum(
        NGOStatus
    ).optional(),

    verificationStatus:

    z.nativeEnum(
        VerificationStatus
    ).optional(),

    location:

    locationSchema,

    contact:

    contactSchema,

    inventory:

    z.array(
        inventorySchema
    ).default([]),

    staff:

    z.array(
        staffSchema
    ).default([]),

    vehicles:

    z.array(
        vehicleSchema
    ).default([]),

    assignments:

    z.array(
        assignmentSchema
    ).default([]),

    donations:

    z.array(
        donationSchema
    ).default([]),

    managedBy:

    z.string(),

    totalVolunteers:

    z.number()
    .default(0),

    activeVolunteers:

    z.number()
    .default(0)

});
/**
 * ------------------------------------------------------------------
 * Update NGO
 * ------------------------------------------------------------------
 */
export const updateNGOSchema =

z.object({

    name:
    z.string()
    .min(3)
    .optional(),

    description:
    z.string()
    .optional(),

    status:
    z.nativeEnum(
        NGOStatus
    )
    .optional(),

    verificationStatus:
    z.nativeEnum(
        VerificationStatus
    )
    .optional(),

    contact:
    contactSchema
    .partial()
    .optional(),

    totalVolunteers:
    z.number()
    .min(0)
    .optional(),

    activeVolunteers:
    z.number()
    .min(0)
    .optional(),

    isActive:
    z.boolean()
    .optional()

});









/**
 * ------------------------------------------------------------------
 * Verify NGO
 * ------------------------------------------------------------------
 */
export const verifyNGOSchema =

z.object({

    verificationStatus:

    z.nativeEnum(
        VerificationStatus
    )

});









/**
 * ------------------------------------------------------------------
 * Replace Inventory
 * ------------------------------------------------------------------
 */
export const updateInventorySchema =

z.object({

    inventory:

    z.array(

        inventorySchema

    )

});









/**
 * ------------------------------------------------------------------
 * Add Inventory Item
 * ------------------------------------------------------------------
 */
export const addInventorySchema =

inventorySchema;









/**
 * ------------------------------------------------------------------
 * Replace Vehicles
 * ------------------------------------------------------------------
 */
export const updateVehiclesSchema =

z.object({

    vehicles:

    z.array(

        vehicleSchema

    )

});









/**
 * ------------------------------------------------------------------
 * Add Vehicle
 * ------------------------------------------------------------------
 */
export const addVehicleSchema =

vehicleSchema;









/**
 * ------------------------------------------------------------------
 * Assign Incident
 * ------------------------------------------------------------------
 */
export const assignIncidentSchema =

assignmentSchema;









/**
 * ------------------------------------------------------------------
 * Complete Assignment
 * ------------------------------------------------------------------
 */
export const completeAssignmentSchema =

z.object({

    assignmentId:

    z.string()

});









/**
 * ------------------------------------------------------------------
 * Add Donation
 * ------------------------------------------------------------------
 */
export const addDonationSchema =

donationSchema;









/**
 * ------------------------------------------------------------------
 * Nearby NGO Search
 * ------------------------------------------------------------------
 */
export const nearbyNGOSchema =

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
 * ------------------------------------------------------------------
 * AI NGO Recommendation
 * ------------------------------------------------------------------
 */
export const recommendNGOSchema =

z.object({

    longitude:

    z.coerce
    .number(),

    latitude:

    z.coerce
    .number(),

    priority:

    z.nativeEnum(
        DisasterPriority
    )

});









/**
 * ------------------------------------------------------------------
 * Export Validators
 * ------------------------------------------------------------------
 */
export const ngoValidators = {

    createNGOSchema,

    updateNGOSchema,

    verifyNGOSchema,

    updateInventorySchema,

    addInventorySchema,

    updateVehiclesSchema,

    addVehicleSchema,

    assignIncidentSchema,

    completeAssignmentSchema,

    addDonationSchema,

    nearbyNGOSchema,

    recommendNGOSchema

};