/**
 * ------------------------------------------------------------------
 * File: services/location.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    ILocation

} from "../maps.interface";

import distanceService
from "./distance.service";

import geofenceService
from "./geofence.service";

class LocationService {

    /**
     * ----------------------------------------------------------
     * In-memory Store
     * Replace with Redis/Database in production
     * ----------------------------------------------------------
     */
    private locations =

        new Map<string, ILocation>();










    /**
     * ----------------------------------------------------------
     * Update Location
     * ----------------------------------------------------------
     */
    update(

        id: string,

        location: ILocation

    ) {

        this.locations.set(

            id,

            location

        );

        return location;

    }










    /**
     * ----------------------------------------------------------
     * Last Known Location
     * ----------------------------------------------------------
     */
    get(

        id: string

    ): ILocation | null {

        return this.locations.get(id)

            ?? null;

    }










    /**
     * ----------------------------------------------------------
     * Remove Location
     * ----------------------------------------------------------
     */
    remove(

        id: string

    ): boolean {

        return this.locations.delete(id);

    }










    /**
     * ----------------------------------------------------------
     * Get All Locations
     * ----------------------------------------------------------
     */
    all(): ILocation[] {

        return [

            ...this.locations.values()

        ];

    }

}
/**
 * ----------------------------------------------------------
 * Calculate Speed
 * ----------------------------------------------------------
 */
calculateSpeed(

    previous: ICoordinate,

    current: ICoordinate,

    elapsedSeconds: number

): number {

    if (elapsedSeconds <= 0) {

        return 0;

    }

    const distance =

        distanceService.haversine(

            previous,

            current

        );

    const metersPerSecond =

        distance /

        elapsedSeconds;

    return Number(

        (metersPerSecond * 3.6)

        .toFixed(2)

    );

}