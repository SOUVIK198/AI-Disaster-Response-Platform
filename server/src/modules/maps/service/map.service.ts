/**
 * ------------------------------------------------------------------
 * File: maps.service.ts
 * ------------------------------------------------------------------
 */

import {

    INearbySearchRequest,
    INearbySearchResponse,
    IRouteRequest,
    IRouteResponse,
    ICoordinate,
    IGeofence,
    IGeofenceResult,
    IHeatmapRequest,
    ICluster

} from "./maps.interface";

import {

    MapProvider

} from "./maps.types";

import googleProvider
from "./providers/google.provider";

import mapboxProvider
from "./providers/mapbox.provider";

import osmProvider
from "./providers/openstreetmap.provider";

class MapsService {

    private provider: MapProvider =
        MapProvider.GOOGLE;










    /**
     * ----------------------------------------------------------
     * Select Provider
     * ----------------------------------------------------------
     */
    selectProvider(

        provider: MapProvider

    ) {

        this.provider = provider;

        return provider;

    }










    /**
     * ----------------------------------------------------------
     * Get Active Provider
     * ----------------------------------------------------------
     */
    private getProvider() {

        switch (this.provider) {

            case MapProvider.GOOGLE:

                return googleProvider;

            case MapProvider.MAPBOX:

                return mapboxProvider;

            case MapProvider.OPENSTREETMAP:

                return osmProvider;

            default:

                return googleProvider;

        }

    }










    /**
     * ----------------------------------------------------------
     * Geocode Address
     * ----------------------------------------------------------
     */
    async geocode(

        address: string

    ): Promise<ICoordinate> {

        return this

            .getProvider()

            .geocode(address);

    }










    /**
     * ----------------------------------------------------------
     * Reverse Geocode
     * ----------------------------------------------------------
     */
    async reverseGeocode(

        coordinate: ICoordinate

    ) {

        return this

            .getProvider()

            .reverseGeocode(

                coordinate

            );

    }










    /**
     * ----------------------------------------------------------
     * Route Calculation
     * ----------------------------------------------------------
     */
    async route(

        request: IRouteRequest

    ): Promise<IRouteResponse> {

        return this

            .getProvider()

            .route(request);

    }










    /**
     * ----------------------------------------------------------
     * Nearby Search
     * ----------------------------------------------------------
     */
    async nearby(

        request: INearbySearchRequest

    ): Promise<INearbySearchResponse> {

        return this

            .getProvider()

            .nearby(request);

    }

}
/**
 * ------------------------------------------------------------------
 * File: maps.service.ts
 * ------------------------------------------------------------------
 */

import {

    INearbySearchRequest,
    INearbySearchResponse,
    IRouteRequest,
    IRouteResponse,
    ICoordinate,
    IGeofence,
    IGeofenceResult,
    IHeatmapRequest,
    ICluster

} from "./maps.interface";

import {

    MapProvider

} from "./maps.types";

import googleProvider
from "./providers/google.provider";

import mapboxProvider
from "./providers/mapbox.provider";

import osmProvider
from "./providers/openstreetmap.provider";

class MapsService {

    private provider: MapProvider =
        MapProvider.GOOGLE;










    /**
     * ----------------------------------------------------------
     * Select Provider
     * ----------------------------------------------------------
     */
    selectProvider(

        provider: MapProvider

    ) {

        this.provider = provider;

        return provider;

    }










    /**
     * ----------------------------------------------------------
     * Get Active Provider
     * ----------------------------------------------------------
     */
    private getProvider() {

        switch (this.provider) {

            case MapProvider.GOOGLE:

                return googleProvider;

            case MapProvider.MAPBOX:

                return mapboxProvider;

            case MapProvider.OPENSTREETMAP:

                return osmProvider;

            default:

                return googleProvider;

        }

    }










    /**
     * ----------------------------------------------------------
     * Geocode Address
     * ----------------------------------------------------------
     */
    async geocode(

        address: string

    ): Promise<ICoordinate> {

        return this

            .getProvider()

            .geocode(address);

    }










    /**
     * ----------------------------------------------------------
     * Reverse Geocode
     * ----------------------------------------------------------
     */
    async reverseGeocode(

        coordinate: ICoordinate

    ) {

        return this

            .getProvider()

            .reverseGeocode(

                coordinate

            );

    }










    /**
     * ----------------------------------------------------------
     * Route Calculation
     * ----------------------------------------------------------
     */
    async route(

        request: IRouteRequest

    ): Promise<IRouteResponse> {

        return this

            .getProvider()

            .route(request);

    }










    /**
     * ----------------------------------------------------------
     * Nearby Search
     * ----------------------------------------------------------
     */
    async nearby(

        request: INearbySearchRequest

    ): Promise<INearbySearchResponse> {

        return this

            .getProvider()

            .nearby(request);

    }

}