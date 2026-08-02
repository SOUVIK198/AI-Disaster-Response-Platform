/**
 * ------------------------------------------------------------------
 * File: providers/mapbox.provider.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IAddress,
    IRouteRequest,
    IRouteResponse,
    IDistanceMatrix,
    INearbySearchRequest,
    INearbySearchResponse,
    IGeofence,
    IGeofenceResult,
    IHeatmapPoint,
    IHeatmapRequest,
    IMarker,
    ICluster

} from "../maps.interface";

import {

    GeofenceEvent

} from "../maps.types";

class MapboxProvider {

    readonly name =

        "Mapbox";

    /**
     * ----------------------------------------------------------
     * Geocode
     * ----------------------------------------------------------
     */
    async geocode(

        address: string

    ): Promise<ICoordinate> {

        // TODO:
        // Mapbox Geocoding API

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

        // TODO:
        // Mapbox Reverse Geocoding

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

        throw new Error(

            "Not implemented."

        );

    }

    /**
     * ----------------------------------------------------------
     * Distance Matrix
     * ----------------------------------------------------------
     */
    async distanceMatrix(

        origins: ICoordinate[],

        destinations: ICoordinate[]

    ): Promise<IDistanceMatrix> {

        return {

            items: []

        };

    }

    /**
     * ----------------------------------------------------------
     * Nearby Search
     * ----------------------------------------------------------
     */
    async nearby(

        request: INearbySearchRequest

    ): Promise<INearbySearchResponse> {

        return {

            locations: []

        };

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

        const inside =

            this.distance(

                location,

                geofence.center

            )

            <=

            geofence.radiusMeters;

        return {

            inside,

            event:

            inside

                ? GeofenceEvent.ENTER

                : GeofenceEvent.EXIT

        };

    }

    /**
     * ----------------------------------------------------------
     * Heatmap
     * ----------------------------------------------------------
     */
    async heatmap(

        request: IHeatmapRequest

    ): Promise<IHeatmapPoint[]> {

        return request.points;

    }

    /**
     * ----------------------------------------------------------
     * Cluster
     * ----------------------------------------------------------
     */
    async cluster(

        markers: IMarker[]

    ): Promise<ICluster[]> {

        return [];

    }

    /**
     * ----------------------------------------------------------
     * Batch Geocode
     * ----------------------------------------------------------
     */
    async batchGeocode(

        addresses: string[]

    ): Promise<ICoordinate[]> {

        return Promise.all(

            addresses.map(

                address =>

                    this.geocode(address)

            )

        );

    }

    /**
     * ----------------------------------------------------------
     * Health
     * ----------------------------------------------------------
     */
    async health(): Promise<boolean> {

        return true;

    }

    /**
     * ----------------------------------------------------------
     * Metadata
     * ----------------------------------------------------------
     */
    metadata() {

        return {

            provider:

            this.name,

            version:

            "1.0.0",

            supports: {

                geocoding: true,

                routing: true,

                distanceMatrix: true,

                nearbySearch: true,

                heatmaps: true,

                clustering: true,

                geofencing: true

            }

        };

    }

    /**
     * ----------------------------------------------------------
     * Distance Helper
     * ----------------------------------------------------------
     */
    private distance(

        a: ICoordinate,

        b: ICoordinate

    ): number {

        const R =

            6371000;

        const rad =

            (v: number) =>

            v *

            Math.PI /

            180;

        const dLat =

            rad(

                b.latitude -

                a.latitude

            );

        const dLon =

            rad(

                b.longitude -

                a.longitude

            );

        const lat1 =

            rad(

                a.latitude

            );

        const lat2 =

            rad(

                b.latitude

            );

        const value =

            Math.sin(

                dLat / 2

            ) ** 2 +

            Math.cos(lat1) *

            Math.cos(lat2) *

            Math.sin(

                dLon / 2

            ) ** 2;

        return 2 *

            R *

            Math.atan2(

                Math.sqrt(value),

                Math.sqrt(1 - value)

            );

    }

}

export default new MapboxProvider();