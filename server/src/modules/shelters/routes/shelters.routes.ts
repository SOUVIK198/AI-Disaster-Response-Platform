/**
 * ------------------------------------------------------------------
 * File: shelter.routes.ts
 *
 * Shelter API Routes
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import shelterController
from "./shelter.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    createShelterSchema,

    updateShelterSchema,

    nearbyShelterSchema,

    recommendShelterSchema,

    updateCapacitySchema,

    admitEvacueesSchema,

    releaseEvacueesSchema,

    updateResourcesSchema,

    addResourceSchema,

    updateFacilitiesSchema,

    updateStaffSchema

} from "./shelter.validation";

const router = Router();









/**
 * Create Shelter
 */
router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        createShelterSchema
    ),

    shelterController.createShelter

);









/**
 * Get All Shelters
 */
router.get(

    "/",

    authMiddleware,

    shelterController.getShelters

);









/**
 * Get Shelter
 */
router.get(

    "/:id",

    authMiddleware,

    shelterController.getShelter

);









/**
 * Update Shelter
 */
router.patch(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        updateShelterSchema
    ),

    shelterController.updateShelter

);









/**
 * Delete Shelter
 */
router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    shelterController.deleteShelter

);









/**
 * Nearby Shelter Search
 */
router.get(

    "/nearby",

    authMiddleware,

    validate(
        nearbyShelterSchema
    ),

    shelterController.getNearbyShelters

);









/**
 * AI Shelter Recommendation
 */
router.get(

    "/recommend",

    authMiddleware,

    validate(
        recommendShelterSchema
    ),

    shelterController.recommendShelter

);
/**
 * ----------------------------------------------------------
 * Update Shelter Capacity
 *
 * PATCH
 * /api/v1/shelters/:id/capacity
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/capacity",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        updateCapacitySchema
    ),

    shelterController.updateCapacity

);









/**
 * ----------------------------------------------------------
 * Admit Evacuees
 *
 * POST
 * /api/v1/shelters/:id/admit
 * ----------------------------------------------------------
 */
router.post(

    "/:id/admit",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN",
        "VOLUNTEER"
    ),

    validate(
        admitEvacueesSchema
    ),

    shelterController.admitEvacuees

);









/**
 * ----------------------------------------------------------
 * Release Evacuees
 *
 * POST
 * /api/v1/shelters/:id/release
 * ----------------------------------------------------------
 */
router.post(

    "/:id/release",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        releaseEvacueesSchema
    ),

    shelterController.releaseEvacuees

);









/**
 * ----------------------------------------------------------
 * Replace Resource Inventory
 *
 * PATCH
 * /api/v1/shelters/:id/resources
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/resources",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        updateResourcesSchema
    ),

    shelterController.updateResources

);









/**
 * ----------------------------------------------------------
 * Add Resource
 *
 * POST
 * /api/v1/shelters/:id/resources
 * ----------------------------------------------------------
 */
router.post(

    "/:id/resources",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN",
        "VOLUNTEER"
    ),

    validate(
        addResourceSchema
    ),

    shelterController.addResource

);









/**
 * ----------------------------------------------------------
 * Update Facilities
 *
 * PATCH
 * /api/v1/shelters/:id/facilities
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/facilities",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        updateFacilitiesSchema
    ),

    shelterController.updateFacilities

);









/**
 * ----------------------------------------------------------
 * Update Staff
 *
 * PATCH
 * /api/v1/shelters/:id/staff
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/staff",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "SHELTER_ADMIN"
    ),

    validate(
        updateStaffSchema
    ),

    shelterController.updateStaff

);









/**
 * ----------------------------------------------------------
 * Shelter Analytics
 *
 * GET
 * /api/v1/shelters/analytics
 * ----------------------------------------------------------
 */
router.get(

    "/analytics",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    shelterController.getStatistics

);









/**
 * ----------------------------------------------------------
 * Shelter Leaderboard
 *
 * GET
 * /api/v1/shelters/leaderboard
 * ----------------------------------------------------------
 */
router.get(

    "/leaderboard",

    authMiddleware,

    shelterController.getLeaderboard

);









export default router;