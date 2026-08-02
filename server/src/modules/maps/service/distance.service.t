/**
 * ------------------------------------------------------------------
 * File: services/distance.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    ILocation,
    IDistanceMatrix

} from "../maps.interface";

import googleProvider
from "../providers/google.provider";

import mapboxProvider
from "../providers/mapbox.provider";

import osmProvider
from "../providers/openstreetmap.provider";

class DistanceService {

    private readonly EARTH_RADIUS =

        6371000;










    /**
     * ----------------------------------------------------------
     * Degrees → Radians
     * ----------------------------------------------------------
     */
    private radians(

        degrees: number

    ) {

        return degrees *

        Math.PI /

        180;

    }










    /**
     * ----------------------------------------------------------
     * Haversine Distance
     * ----------------------------------------------------------
     */
    haversine(

        a: ICoordinate,

        b: ICoordinate

    ): number {

        const dLat =

            this.radians(

                b.latitude -

                a.latitude

            );

        const dLon =

            this.radians(

                b.longitude -

                a.longitude

            );

        const lat1 =

            this.radians(

                a.latitude

            );

        const lat2 =

            this.radians(

                b.latitude

            );

        const value =

            Math.sin(dLat / 2) ** 2 +

            Math.cos(lat1) *

            Math.cos(lat2) *

            Math.sin(dLon / 2) ** 2;

        const c =

            2 *

            Math.atan2(

                Math.sqrt(value),

                Math.sqrt(1 - value)

            );

        return this.EARTH_RADIUS * c;

    }










    /**
     * ----------------------------------------------------------
     * Road Distance
     * ----------------------------------------------------------
     */
    async roadDistance(

        origin: ICoordinate,

        destination: ICoordinate

    ) {

        const providers = [

            googleProvider,

            mapboxProvider,

            osmProvider

        ];

        for (

            const provider

            of providers

        ) {

            try {

                return await provider.distanceMatrix(

                    [origin],

                    [destination]

                );

            }

            catch {

                continue;

            }

        }

        throw new Error(

            "Unable to calculate road distance."

        );

    }

}
/**
 * ------------------------------------------------------------------
 * File: services/distance.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    ILocation,
    IDistanceMatrix

} from "../maps.interface";

import googleProvider
from "../providers/google.provider";

import mapboxProvider
from "../providers/mapbox.provider";

import osmProvider
from "../providers/openstreetmap.provider";

class DistanceService {

    private readonly EARTH_RADIUS =

        6371000;










    /**
     * ----------------------------------------------------------
     * Degrees → Radians
     * ----------------------------------------------------------
     */
    private radians(

        degrees: number

    ) {

        return degrees *

        Math.PI /

        180;

    }










    /**
     * ----------------------------------------------------------
     * Haversine Distance
     * ----------------------------------------------------------
     */
    haversine(

        a: ICoordinate,

        b: ICoordinate

    ): number {

        const dLat =

            this.radians(

                b.latitude -

                a.latitude

            );

        const dLon =

            this.radians(

                b.longitude -

                a.longitude

            );

        const lat1 =

            this.radians(

                a.latitude

            );

        const lat2 =

            this.radians(

                b.latitude

            );

        const value =

            Math.sin(dLat / 2) ** 2 +

            Math.cos(lat1) *

            Math.cos(lat2) *

            Math.sin(dLon / 2) ** 2;

        const c =

            2 *

            Math.atan2(

                Math.sqrt(value),

                Math.sqrt(1 - value)

            );

        return this.EARTH_RADIUS * c;

    }










    /**
     * ----------------------------------------------------------
     * Road Distance
     * ----------------------------------------------------------
     */
    async roadDistance(

        origin: ICoordinate,

        destination: ICoordinate

    ) {

        const providers = [

            googleProvider,

            mapboxProvider,

            osmProvider

        ];

        for (

            const provider

            of providers

        ) {

            try {

                return await provider.distanceMatrix(

                    [origin],

                    [destination]

                );

            }

            catch {

                continue;

            }

        }

        throw new Error(

            "Unable to calculate road distance."

        );

    }

}