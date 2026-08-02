/**
 * ------------------------------------------------------------------
 * File: maps.validation.ts
 * ------------------------------------------------------------------
 */

import { z } from "zod";

import {

    HeatmapType,
    LocationType,
    MapProvider,
    RoutePreference,
    TravelMode

} from "./maps.types";

/**
 * ----------------------------------------------------------
 * Coordinate
 * ----------------------------------------------------------
 */

export const coordinateSchema = z.object({

    latitude: z.number()

        .min(-90)

        .max(90),

    longitude: z.number()

        .min(-180)

        .max(180)

});

/**
 * ----------------------------------------------------------
 * Geocode
 * ----------------------------------------------------------
 */

export const geocodeSchema = z.object({

    body: z.object({

        address: z.string()

            .min(3)

            .max(500)

    })

});

/**
 * ----------------------------------------------------------
 * Reverse Geocode
 * ----------------------------------------------------------
 */

export const reverseGeocodeSchema = z.object({

    body: z.object({

        coordinate:

        coordinateSchema

    })

});

/**
 * ----------------------------------------------------------
 * Route
 * ----------------------------------------------------------
 */

export const routeSchema = z.object({

    body: z.object({

        origin:

        coordinateSchema,

        destination:

        coordinateSchema,

        travelMode:

        z.nativeEnum(

            TravelMode

        ),

        preference:

        z.nativeEnum(

            RoutePreference

        )

    })

});

/**
 * ----------------------------------------------------------
 * Nearby Search
 * ----------------------------------------------------------
 */

export const nearbySchema = z.object({

    body: z.object({

        coordinate:

        coordinateSchema,

        radiusMeters:

        z.number()

            .positive()

            .max(100000),

        type:

        z.nativeEnum(

            LocationType

        )

    })

});

/**
 * ----------------------------------------------------------
 * Distance Matrix
 * ----------------------------------------------------------
 */

export const distanceMatrixSchema = z.object({

    body: z.object({

        origins:

        z.array(

            coordinateSchema

        ).min(1),

        destinations:

        z.array(

            coordinateSchema

        ).min(1)

    })

});

/**
 * ----------------------------------------------------------
 * Geofence
 * ----------------------------------------------------------
 */

export const geofenceSchema = z.object({

    body: z.object({

        location:

        coordinateSchema,

        geofence:

        z.object({

            center:

            coordinateSchema,

            radiusMeters:

            z.number()

                .positive()

        })

    })

});

/**
 * ----------------------------------------------------------
 * Heatmap
 * ----------------------------------------------------------
 */

export const heatmapSchema = z.object({

    body: z.object({

        type:

        z.nativeEnum(

            HeatmapType

        ),

        points:

        z.array(

            z.object({

                coordinate:

                coordinateSchema,

                weight:

                z.number()

                    .positive()

            })

        )

    })

});

/**
 * ----------------------------------------------------------
 * Cluster
 * ----------------------------------------------------------
 */

export const clusterSchema = z.object({

    body: z.object({

        markers:

        z.array(

            z.any()

        ).min(1)

    })

});

/**
 * ----------------------------------------------------------
 * Provider
 * ----------------------------------------------------------
 */

export const providerSchema = z.object({

    body: z.object({

        provider:

        z.nativeEnum(

            MapProvider

        )

    })

});