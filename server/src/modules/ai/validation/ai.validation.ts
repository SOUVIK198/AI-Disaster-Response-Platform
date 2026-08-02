/**
 * ------------------------------------------------------------------
 * File: ai.validation.ts
 * ------------------------------------------------------------------
 */

import { z } from "zod";

import {

    AIProvider,

    AITask,

    ChatRole,

    ModelType

} from "./ai.types";










/**
 * ----------------------------------------------------------
 * LLM Message
 * ----------------------------------------------------------
 */
export const llmMessageSchema =

z.object({

    role:

    z.nativeEnum(

        ChatRole

    ),

    content:

    z.string()

    .min(1)

    .max(10000)

});










/**
 * ----------------------------------------------------------
 * Chat Request
 * ----------------------------------------------------------
 */
export const chatSchema =

z.object({

    provider:

    z.nativeEnum(

        AIProvider

    ),

    task:

    z.literal(

        AITask.CHAT

    ),

    modelType:

    z.nativeEnum(

        ModelType

    ),

    input:

    z.string()

    .optional(),

    model:

    z.string()

    .min(1),

    messages:

    z.array(

        llmMessageSchema

    )

    .min(1),

    temperature:

    z.number()

    .min(0)

    .max(2)

    .optional(),

    maxTokens:

    z.number()

    .int()

    .positive()

    .optional()

});










/**
 * ----------------------------------------------------------
 * Prediction Request
 * ----------------------------------------------------------
 */
export const predictionSchema =

z.object({

    input:

    z.string()

    .min(10)

    .max(5000)

});
/**
 * ----------------------------------------------------------
 * Provider Selection
 * ----------------------------------------------------------
 */
export const providerSchema =

z.object({

    provider:

    z.nativeEnum(

        AIProvider

    )

});










/**
 * ----------------------------------------------------------
 * Recommendation Request
 * ----------------------------------------------------------
 */
export const recommendationSchema =

z.object({

    incidentId:

    z.string()

    .min(1)

    .optional(),

    latitude:

    z.number()

    .min(-90)

    .max(90)

    .optional(),

    longitude:

    z.number()

    .min(-180)

    .max(180)

    .optional(),

    radius:

    z.number()

    .positive()

    .max(1000)

    .optional()

});










/**
 * ----------------------------------------------------------
 * Health Check
 * ----------------------------------------------------------
 */
export const healthSchema =

z.object({});