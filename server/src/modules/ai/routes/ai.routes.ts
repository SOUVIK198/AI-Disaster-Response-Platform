/**
 * ------------------------------------------------------------------
 * File: ai.routes.ts
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import aiController
from "./ai.controller";

import authMiddleware
from "../../middlewares/auth.middleware";

import roleMiddleware
from "../../middlewares/role.middleware";

import validate
from "../../middlewares/validation.middleware";

import {

    chatSchema,

    predictionSchema,

    summarizeSchema,

    embeddingSchema

} from "./ai.validation";

const router = Router();










/**
 * ----------------------------------------------------------
 * Chat Completion
 * POST /ai/chat
 * ----------------------------------------------------------
 */
router.post(

    "/chat",

    authMiddleware,

    validate(

        chatSchema

    ),

    aiController.chat

);










/**
 * ----------------------------------------------------------
 * Disaster Prediction
 * POST /ai/predict
 * ----------------------------------------------------------
 */
router.post(

    "/predict",

    authMiddleware,

    validate(

        predictionSchema

    ),

    aiController.predict

);










/**
 * ----------------------------------------------------------
 * Incident Summarization
 * POST /ai/summarize
 * ----------------------------------------------------------
 */
router.post(

    "/summarize",

    authMiddleware,

    validate(

        summarizeSchema

    ),

    aiController.summarize

);










/**
 * ----------------------------------------------------------
 * General Recommendations
 * GET /ai/recommendations
 * ----------------------------------------------------------
 */
router.get(

    "/recommendations",

    authMiddleware,

    aiController.recommendations

);










/**
 * ----------------------------------------------------------
 * Generate Embeddings
 * POST /ai/embeddings
 * ----------------------------------------------------------
 */
router.post(

    "/embeddings",

    authMiddleware,

    validate(

        embeddingSchema

    ),

    aiController.embeddings

);
/**
 * ----------------------------------------------------------
 * Provider Health Check
 * GET /ai/providers/health
 * ----------------------------------------------------------
 */
router.get(

    "/providers/health",

    authMiddleware,

    aiController.health

);










/**
 * ----------------------------------------------------------
 * Select AI Provider
 * GET /ai/providers/select/:provider
 * ----------------------------------------------------------
 */
router.get(

    "/providers/select/:provider",

    authMiddleware,

    roleMiddleware(

        "ADMIN"

    ),

    aiController.selectProvider

);










/**
 * ----------------------------------------------------------
 * Resource Recommendations
 * GET /ai/recommendations/resources
 * ----------------------------------------------------------
 */
router.get(

    "/recommendations/resources",

    authMiddleware,

    aiController.resourceRecommendations

);










/**
 * ----------------------------------------------------------
 * Volunteer Recommendations
 * GET /ai/recommendations/volunteers
 * ----------------------------------------------------------
 */
router.get(

    "/recommendations/volunteers",

    authMiddleware,

    aiController.volunteerRecommendations

);










/**
 * ----------------------------------------------------------
 * Hospital Recommendations
 * GET /ai/recommendations/hospitals
 * ----------------------------------------------------------
 */
router.get(

    "/recommendations/hospitals",

    authMiddleware,

    aiController.hospitalRecommendations

);










/**
 * ----------------------------------------------------------
 * Shelter Recommendations
 * GET /ai/recommendations/shelters
 * ----------------------------------------------------------
 */
router.get(

    "/recommendations/shelters",

    authMiddleware,

    aiController.shelterRecommendations

);










export default router;