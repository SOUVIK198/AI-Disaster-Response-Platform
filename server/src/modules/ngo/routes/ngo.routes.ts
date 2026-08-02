/**
 * ------------------------------------------------------------------
 * File: ngo.routes.ts
 *
 * NGO API Routes
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import ngoController
from "./ngo.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    createNGOSchema,

    updateNGOSchema,

    verifyNGOSchema,

    nearbyNGOSchema,

    recommendNGOSchema,

    updateInventorySchema,

    addInventorySchema,

    updateVehiclesSchema,

    addVehicleSchema,

    assignIncidentSchema,

    completeAssignmentSchema,

    addDonationSchema

} from "./ngo.validation";

const router = Router();









/**
 * ----------------------------------------------------------
 * Register NGO
 * POST /ngos
 * ----------------------------------------------------------
 */
router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        createNGOSchema
    ),

    ngoController.createNGO

);









/**
 * ----------------------------------------------------------
 * Get All NGOs
 * GET /ngos
 * ----------------------------------------------------------
 */
router.get(

    "/",

    authMiddleware,

    ngoController.getNGOs

);









/**
 * ----------------------------------------------------------
 * Nearby NGOs
 * GET /ngos/nearby
 * ----------------------------------------------------------
 */
router.get(

    "/nearby",

    authMiddleware,

    validate(
        nearbyNGOSchema
    ),

    ngoController.getNearbyNGOs

);









/**
 * ----------------------------------------------------------
 * AI Recommendation
 * GET /ngos/recommend
 * ----------------------------------------------------------
 */
router.get(

    "/recommend",

    authMiddleware,

    validate(
        recommendNGOSchema
    ),

    ngoController.recommendNGO

);









/**
 * ----------------------------------------------------------
 * Analytics
 * GET /ngos/analytics
 * ----------------------------------------------------------
 */
router.get(

    "/analytics",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    ngoController.getStatistics

);









/**
 * ----------------------------------------------------------
 * Leaderboard
 * GET /ngos/leaderboard
 * ----------------------------------------------------------
 */
router.get(

    "/leaderboard",

    authMiddleware,

    ngoController.getLeaderboard

);









/**
 * ----------------------------------------------------------
 * Get NGO
 * GET /ngos/:id
 * ----------------------------------------------------------
 */
router.get(

    "/:id",

    authMiddleware,

    ngoController.getNGO

);









/**
 * ----------------------------------------------------------
 * Update NGO
 * PATCH /ngos/:id
 * ----------------------------------------------------------
 */
router.patch(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        updateNGOSchema
    ),

    ngoController.updateNGO

);









/**
 * ----------------------------------------------------------
 * Delete NGO
 * DELETE /ngos/:id
 * ----------------------------------------------------------
 */
router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    ngoController.deleteNGO

);









/**
 * ----------------------------------------------------------
 * Verify NGO
 * PATCH /ngos/:id/verify
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/verify",

    authMiddleware,

    roleMiddleware(
        "ADMIN"
    ),

    validate(
        verifyNGOSchema
    ),

    ngoController.verifyNGO

);
/**
 * ----------------------------------------------------------
 * Replace Inventory
 * PATCH /ngos/:id/inventory
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/inventory",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        updateInventorySchema
    ),

    ngoController.updateInventory

);









/**
 * ----------------------------------------------------------
 * Add Inventory Item
 * POST /ngos/:id/inventory
 * ----------------------------------------------------------
 */
router.post(

    "/:id/inventory",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        addInventorySchema
    ),

    ngoController.addInventoryItem

);









/**
 * ----------------------------------------------------------
 * Replace Vehicles
 * PATCH /ngos/:id/vehicles
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/vehicles",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        updateVehiclesSchema
    ),

    ngoController.updateVehicles

);









/**
 * ----------------------------------------------------------
 * Add Vehicle
 * POST /ngos/:id/vehicles
 * ----------------------------------------------------------
 */
router.post(

    "/:id/vehicles",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        addVehicleSchema
    ),

    ngoController.addVehicle

);









/**
 * ----------------------------------------------------------
 * Assign Incident
 * POST /ngos/:id/assignments
 * ----------------------------------------------------------
 */
router.post(

    "/:id/assignments",

    authMiddleware,

    roleMiddleware(
        "ADMIN",
        "DISASTER_MANAGER"
    ),

    validate(
        assignIncidentSchema
    ),

    ngoController.assignIncident

);









/**
 * ----------------------------------------------------------
 * Complete Assignment
 * PATCH /ngos/:id/assignments/:assignmentId
 * ----------------------------------------------------------
 */
router.patch(

    "/:id/assignments/:assignmentId",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        completeAssignmentSchema
    ),

    ngoController.completeAssignment

);









/**
 * ----------------------------------------------------------
 * Add Donation
 * POST /ngos/:id/donations
 * ----------------------------------------------------------
 */
router.post(

    "/:id/donations",

    authMiddleware,

    roleMiddleware(
        "NGO_ADMIN",
        "ADMIN"
    ),

    validate(
        addDonationSchema
    ),

    ngoController.addDonation

);









export default router;