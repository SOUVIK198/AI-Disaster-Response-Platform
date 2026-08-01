/**
 * ------------------------------------------------------------------
 * File: volunteer.routes.ts
 *
 * Volunteer API Routes
 *
 * ------------------------------------------------------------------
 */


import { Router } from "express";


import volunteerController from "./volunteer.controller";


// Middlewares
import authMiddleware from "../../middlewares/auth.middleware";

import roleMiddleware from "../../middlewares/role.middleware";

import validate from "../../middlewares/validation.middleware";


// Validators
import {

    createVolunteerSchema,

    updateVolunteerSchema,

    updateLocationSchema,

    updateStatusSchema

} from "./volunteer.validation";



const router = Router();







/**
 * Create Volunteer
 *
 * POST
 * /api/v1/volunteers
 */
router.post(

    "/",

    authMiddleware,


    validate(
        createVolunteerSchema
    ),


    volunteerController
    .createVolunteer

);









/**
 * Get volunteer profile
 *
 * GET
 * /api/v1/volunteers/:id
 */
router.get(

    "/:id",

    authMiddleware,


    volunteerController
    .getVolunteer

);









/**
 * Update volunteer
 *
 * PATCH
 * /api/v1/volunteers/:id
 */
router.patch(

    "/:id",

    authMiddleware,


    validate(
        updateVolunteerSchema
    ),


    volunteerController
    .updateVolunteer

);









/**
 * Delete volunteer
 *
 * DELETE
 * /api/v1/volunteers/:id
 */
router.delete(

    "/:id",

    authMiddleware,


    roleMiddleware(
        "ADMIN"
    ),


    volunteerController
    .deleteVolunteer

);









/**
 * Update GPS location
 *
 * PATCH
 * /api/v1/volunteers/:id/location
 */
router.patch(

    "/:id/location",

    authMiddleware,


    validate(
        updateLocationSchema
    ),


    volunteerController
    .updateLocation

);









/**
 * Update volunteer status
 *
 * PATCH
 * /api/v1/volunteers/:id/status
 */
router.patch(

    "/:id/status",

    authMiddleware,


    validate(
        updateStatusSchema
    ),


    volunteerController
    .changeStatus

);



export default router;
/**
 * Find nearby volunteers
 *
 * GET
 * /api/v1/volunteers/nearby
 *
 * Query:
 * longitude
 * latitude
 * radius
 */
router.get(

    "/nearby",

    authMiddleware,


    volunteerController
    .getNearbyVolunteers

);









/**
 * Get available volunteers
 *
 * GET
 * /api/v1/volunteers/available
 */
router.get(

    "/available",

    authMiddleware,


    volunteerController
    .getAvailableVolunteers

);









/**
 * Check volunteer availability
 *
 * GET
 * /api/v1/volunteers/:id/availability
 */
router.get(

    "/:id/availability",

    authMiddleware,


    volunteerController
    .checkAvailability

);









/**
 * Get volunteer workload
 *
 * GET
 * /api/v1/volunteers/:id/workload
 */
router.get(

    "/:id/workload",

    authMiddleware,


    volunteerController
    .getWorkload

);









/**
 * Accept mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/accept
 */
router.post(

    "/:id/missions/accept",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .acceptMission

);









/**
 * Reject mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/reject
 */
router.post(

    "/:id/missions/reject",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .rejectMission

);









/**
 * Start mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/start
 */
router.post(

    "/:id/missions/start",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .startMission

);









/**
 * Complete mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/complete
 */
router.post(

    "/:id/missions/complete",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .completeMission

);
/**
 * Find nearby volunteers
 *
 * GET
 * /api/v1/volunteers/nearby
 *
 * Query:
 * longitude
 * latitude
 * radius
 */
router.get(

    "/nearby",

    authMiddleware,


    volunteerController
    .getNearbyVolunteers

);









/**
 * Get available volunteers
 *
 * GET
 * /api/v1/volunteers/available
 */
router.get(

    "/available",

    authMiddleware,


    volunteerController
    .getAvailableVolunteers

);









/**
 * Check volunteer availability
 *
 * GET
 * /api/v1/volunteers/:id/availability
 */
router.get(

    "/:id/availability",

    authMiddleware,


    volunteerController
    .checkAvailability

);









/**
 * Get volunteer workload
 *
 * GET
 * /api/v1/volunteers/:id/workload
 */
router.get(

    "/:id/workload",

    authMiddleware,


    volunteerController
    .getWorkload

);









/**
 * Accept mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/accept
 */
router.post(

    "/:id/missions/accept",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .acceptMission

);









/**
 * Reject mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/reject
 */
router.post(

    "/:id/missions/reject",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .rejectMission

);









/**
 * Start mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/start
 */
router.post(

    "/:id/missions/start",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .startMission

);









/**
 * Complete mission
 *
 * POST
 * /api/v1/volunteers/:id/missions/complete
 */
router.post(

    "/:id/missions/complete",

    authMiddleware,


    roleMiddleware(
        "VOLUNTEER"
    ),


    volunteerController
    .completeMission

);