/**
 * ------------------------------------------------------------------
 * File: services/geocoding.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IAddress

} from "../maps.interface";

import googleProvider
from "../providers/google.provider";

import mapboxProvider
from "../providers/mapbox.provider";

import osmProvider
from "../providers/openstreetmap.provider";

class GeocodingService {

    /**
     * ----------------------------------------------------------
     * Provider Order
     * ----------------------------------------------------------
     */
    private providers = [

        googleProvider,

        mapboxProvider,

        osmProvider

    ];

    /**
     * ----------------------------------------------------------
     * Geocode
     * ----------------------------------------------------------
     */
    async geocode(

        address: string

    ): Promise<ICoordinate> {

        for (

            const provider

            of this.providers

        ) {

            try {

                return await provider.geocode(

                    address

                );

            }

            catch {

                continue;

            }

        }

        throw new Error(

            "Unable to geocode address."

        );

    }

    /**
     * ----------------------------------------------------------
     * Reverse Geocode
     * ----------------------------------------------------------
     */
    async reverseGeocode(

        coordinate: ICoordinate

    ): Promise<IAddress> {

        for (

            const provider

            of this.providers

        ) {

            try {

                return await provider.reverseGeocode(

                    coordinate

                );

            }

            catch {

                continue;

            }

        }

        throw new Error(

            "Unable to reverse geocode."

        );

    }

    /**
     * ----------------------------------------------------------
     * Normalize Address
     * ----------------------------------------------------------
     */
    normalize(

        address: string

    ): string {

        return address

            .trim()

            .replace(/\s+/g, " ");

    }

}
/**
 * ----------------------------------------------------------
 * Batch Geocoding
 * ----------------------------------------------------------
 */
async batchGeocode(

    addresses: string[]

): Promise<ICoordinate[]> {

    const results: ICoordinate[] = [];

    for (const address of addresses) {

        const coordinate =

        await this.geocode(

            this.normalize(address)

        );

        results.push(

            coordinate

        );

    }

    return results;

}