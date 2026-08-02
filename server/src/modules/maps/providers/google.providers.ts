/**
 * ------------------------------------------------------------------
 * File: providers/google.provider.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IAddress,
    IRouteRequest,
    IRouteResponse,
    IDistanceMatrix,
    INearbySearchRequest,
    INearbySearchResponse

} from "../maps.interface";

class GoogleProvider {

    /**
     * ----------------------------------------------------------
     * Provider Name
     * ----------------------------------------------------------
     */
    readonly name = "Google Maps";










    /**
     * ----------------------------------------------------------
     * Geocode
     * ----------------------------------------------------------
     */
    async geocode(

        address: string

    ): Promise<ICoordinate> {

        /**
         * TODO
         *
         * Call:
         * Google Geocoding API
         */

        return {

            latitude: 0,

            longitude: 0

        };

    }










    /**
     * ----------------------------------------------------------
     * Reverse Geocode
     * ----------------------------------------------------------
     */
    async reverseGeocode(

        coordinate: ICoordinate

    ): Promise<IAddress> {

        /**
         * TODO
         *
         * Google Reverse Geocode API
         */

        return {

            line1: "",

            city: "",

            state: "",

            country: "",

            postalCode: ""

        };

    }










    /**
     * ----------------------------------------------------------
     * Route
     * ----------------------------------------------------------
     */
    async route(

        request: IRouteRequest

    ): Promise<IRouteResponse> {

        /**
         * TODO
         *
         * Google Directions API
         */

        throw new Error(

            "Not implemented."

        );

    }

}
/**
 * ----------------------------------------------------------
 * Geofence
 * ----------------------------------------------------------
 */
async geofence(

    location: ICoordinate,

    geofence: IGeofence

): Promise<IGeofenceResult> {

    const distance =

        this.calculateDistance(

            location,

            geofence.center

        );

    return {

        inside:

        distance <=

        geofence.radiusMeters,

        event:

        distance <=

        geofence.radiusMeters

            ? GeofenceEvent.ENTER

            : GeofenceEvent.EXIT

    };

}