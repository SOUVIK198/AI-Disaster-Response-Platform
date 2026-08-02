/**
 * ------------------------------------------------------------------
 * File: services/geofence.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IGeofence,
    IGeofenceResult

} from "../maps.interface";

import {

    GeofenceEvent

} from "../maps.types";

import distanceService
from "./distance.service";

class GeofenceService {

    /**
     * ----------------------------------------------------------
     * Check Circular Geofence
     * ----------------------------------------------------------
     */
    check(

        location: ICoordinate,

        geofence: IGeofence

    ): IGeofenceResult {

        const distance =

            distanceService.haversine(

                location,

                geofence.center

            );

        const inside =

            distance <=

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
     * Is Inside
     * ----------------------------------------------------------
     */
    isInside(

        location: ICoordinate,

        geofence: IGeofence

    ): boolean {

        return this.check(

            location,

            geofence

        ).inside;

    }










    /**
     * ----------------------------------------------------------
     * Is Outside
     * ----------------------------------------------------------
     */
    isOutside(

        location: ICoordinate,

        geofence: IGeofence

    ): boolean {

        return !this.isInside(

            location,

            geofence

        );

    }

}
/**
 * ----------------------------------------------------------
 * Detect Transition
 * ----------------------------------------------------------
 */
detectTransition(

    previousInside: boolean,

    currentLocation: ICoordinate,

    geofence: IGeofence

): GeofenceEvent {

    const currentInside =

        this.isInside(

            currentLocation,

            geofence

        );

    if (

        !previousInside &&

        currentInside

    ) {

        return GeofenceEvent.ENTER;

    }

    if (

        previousInside &&

        !currentInside

    ) {

        return GeofenceEvent.EXIT;

    }

    return currentInside

        ? GeofenceEvent.INSIDE

        : GeofenceEvent.OUTSIDE;

}