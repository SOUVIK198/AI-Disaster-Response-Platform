/**
 * ------------------------------------------------------------------
 * File: hospital.routes.ts
 *
 * Hospital API Routes
 *
 * ------------------------------------------------------------------
 */


import { Router } from "express";


import hospitalController
from "./hospital.controller";



// Middlewares
import authMiddleware
from "../../middlewares/auth.middleware";


import roleMiddleware
from "../../middlewares/role.middleware";



import validate
from "../../middlewares/validation.middleware";



// Validators
import {

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


} from "./hospital.validation";





const router = Router();









/**
 * Create Hospital
 *
 * POST
 * /api/v1/hospitals
 */
router.post(

    "/",

    authMiddleware,


    roleMiddleware(
        "ADMIN",
        "HOSPITAL_ADMIN"
    ),


    validate(
        createHospitalSchema
    ),


    hospitalController
    .createHospital

);









/**
 * Get all hospitals
 *
 * GET
 * /api/v1/hospitals
 */
router.get(

    "/",

    authMiddleware,


    hospitalController
    .getHospitals

);









/**
 * Get hospital by id
 *
 * GET
 * /api/v1/hospitals/:id
 */
router.get(

    "/:id",

    authMiddleware,


    hospitalController
    .getHospital

);









/**
 * Update hospital
 *
 * PATCH
 * /api/v1/hospitals/:id
 */
router.patch(

    "/:id",

    authMiddleware,


    roleMiddleware(
        "ADMIN",
        "HOSPITAL_ADMIN"
    ),


    validate(
        updateHospitalSchema
    ),


    hospitalController
    .updateHospital

);









/**
 * Delete hospital
 *
 * DELETE
 * /api/v1/hospitals/:id
 */
router.delete(

    "/:id",

    authMiddleware,


    roleMiddleware(
        "ADMIN"
    ),


    hospitalController
    .deleteHospital

);









/**
 * Nearby hospitals
 *
 * GET
 * /api/v1/hospitals/nearby
 */
router.get(

    "/nearby",

    authMiddleware,


    validate(
        nearbyHospitalSchema
    ),


    hospitalController
    .getNearbyHospitals

);









/**
 * AI Best Hospital Selection
 *
 * GET
 * /api/v1/hospitals/best
 */
router.get(

    "/best",

    authMiddleware,


    validate(
        bestHospitalSchema
    ),


    hospitalController
    .findBestHospital

);
/**
 * Update Bed Availability
 *
 * PATCH
 * /api/v1/hospitals/:id/beds
 */
router.patch(

    "/:id/beds",

    authMiddleware,


    roleMiddleware(
        "ADMIN",
        "HOSPITAL_ADMIN"
    ),


    validate(
        updateBedSchema
    ),


    hospitalController
    .updateBedAvailability

);









/**
 * Allocate Bed
 *
 * POST
 * /api/v1/hospitals/:id/beds/allocate
 */
router.post(

    "/:id/beds/allocate",

    authMiddleware,


    roleMiddleware(
        "HOSPITAL_ADMIN",
        "DOCTOR"
    ),


    validate(
        bedOperationSchema
    ),


    hospitalController
    .allocateBed

);









/**
 * Release Bed
 *
 * POST
 * /api/v1/hospitals/:id/beds/release
 */
router.post(

    "/:id/beds/release",

    authMiddleware,


    roleMiddleware(
        "HOSPITAL_ADMIN",
        "DOCTOR"
    ),


    validate(
        bedOperationSchema
    ),


    hospitalController
    .releaseBed

);









/**
 * Update ICU Capacity
 *
 * PATCH
 * /api/v1/hospitals/:id/icu
 */
router.patch(

    "/:id/icu",

    authMiddleware,


    roleMiddleware(
        "HOSPITAL_ADMIN"
    ),


    validate(
        updateICUSchema
    ),


    hospitalController
    .updateICU

);









/**
 * Update Blood Inventory
 *
 * PATCH
 * /api/v1/hospitals/:id/blood
 */
router.patch(

    "/:id/blood",

    authMiddleware,


    roleMiddleware(
        "HOSPITAL_ADMIN",
        "BLOOD_MANAGER"
    ),


    validate(
        updateBloodSchema
    ),


    hospitalController
    .updateBlood

);









/**
 * Find Blood Availability
 *
 * GET
 * /api/v1/hospitals/blood/:group
 */
router.get(

    "/blood/:group",

    authMiddleware,


    hospitalController
    .findBlood

);









/**
 * Update Ambulance Status
 *
 * PATCH
 * /api/v1/hospitals/:id/ambulance
 */
router.patch(

    "/:id/ambulance",

    authMiddleware,


    roleMiddleware(
        "HOSPITAL_ADMIN",
        "AMBULANCE_MANAGER"
    ),


    validate(
        updateAmbulanceSchema
    ),


    hospitalController
    .updateAmbulance

);









/**
 * Admit Emergency Patient
 *
 * POST
 * /api/v1/hospitals/:id/admit
 */
router.post(

    "/:id/admit",

    authMiddleware,


    roleMiddleware(
        "DOCTOR",
        "HOSPITAL_ADMIN"
    ),


    validate(
        patientAdmissionSchema
    ),


    hospitalController
    .admitPatient

);









/**
 * Discharge Patient
 *
 * POST
 * /api/v1/hospitals/:id/discharge
 */
router.post(

    "/:id/discharge",

    authMiddleware,


    roleMiddleware(
        "DOCTOR",
        "HOSPITAL_ADMIN"
    ),


    hospitalController
    .dischargePatient

);









/**
 * Hospital Analytics
 *
 * GET
 * /api/v1/hospitals/analytics
 */
router.get(

    "/analytics",

    authMiddleware,


    roleMiddleware(
        "ADMIN"
    ),


    hospitalController
    .getStatistics

);