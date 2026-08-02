/**
 * ------------------------------------------------------------------
 * File: maps.routes.ts
 * ------------------------------------------------------------------
 */

import { Router } from "express";

import mapsController from "./maps.controller";

import {

    geocodeSchema,
    reverseGeocodeSchema,
    routeSchema,
    nearbySchema,
    distanceMatrixSchema,
    geofenceSchema,
    heatmapSchema,
    clusterSchema,
    providerSchema

} from "./maps.validation";

import validate
from "../../middlewares/validation.middleware";

import authenticate
from "../../middlewares/auth.middleware";

import authorize
from "../../middlewares/role.middleware";

import rateLimiter
from "../../middlewares/ratelimiter.middleware";

const router = Router();

/**
 * ----------------------------------------------------------
 * Apply Common Middlewares
 * ----------------------------------------------------------
 */

router.use(authenticate);

router.use(rateLimiter);

/**
 * ----------------------------------------------------------
 * Geocoding
 * ----------------------------------------------------------
 */

router.post(

    "/geocode",

    validate(geocodeSchema),

    mapsController.geocode

);

router.post(

    "/reverse-geocode",

    validate(reverseGeocodeSchema),

    mapsController.reverseGeocode

);

/**
 * ----------------------------------------------------------
 * Routing
 * ----------------------------------------------------------
 */

router.post(

    "/route",

    validate(routeSchema),

    mapsController.route

);

router.post(

    "/distance-matrix",

    validate(distanceMatrixSchema),

    mapsController.distanceMatrix

);

/**
 * ----------------------------------------------------------
 * Nearby Search
 * ----------------------------------------------------------
 */

router.post(

    "/nearby",

    validate(nearbySchema),

    mapsController.nearby

);

/**
 * ----------------------------------------------------------
 * Geofence
 * ----------------------------------------------------------
 */

router.post(

    "/geofence",

    validate(geofenceSchema),

    mapsController.geofence

);

/**
 * ----------------------------------------------------------
 * Heatmap
 * ----------------------------------------------------------
 */

router.post(

    "/heatmap",

    validate(heatmapSchema),

    mapsController.heatmap

);

/**
 * ----------------------------------------------------------
 * Marker Clustering
 * ----------------------------------------------------------
 */

router.post(

    "/cluster",

    validate(clusterSchema),

    mapsController.cluster

);

/**
 * ----------------------------------------------------------
 * Provider Management
 * Admin Only
 * ----------------------------------------------------------
 */

router.post(

    "/provider",

    authorize("ADMIN"),

    validate(providerSchema),

    mapsController.provider

);

/**
 * ----------------------------------------------------------
 * Provider Health
 * ----------------------------------------------------------
 */

router.get(

    "/health",

    mapsController.health

);

export default router;