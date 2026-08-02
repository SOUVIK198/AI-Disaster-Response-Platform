/**
 * ------------------------------------------------------------------
 * File: services/routing.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IRouteRequest,
    IRouteResponse

} from "../maps.interface";

import googleProvider
from "../providers/google.provider";

import mapboxProvider
from "../providers/mapbox.provider";

import osmProvider
from "../providers/openstreetmap.provider";

class RoutingService {

    /**
     * ----------------------------------------------------------
     * Provider Priority
     * ----------------------------------------------------------
     */
    private providers = [

        googleProvider,

        mapboxProvider,

        osmProvider

    ];










    /**
     * ----------------------------------------------------------
     * Calculate Route
     * ----------------------------------------------------------
     */
    async calculate(

        request: IRouteRequest

    ): Promise<IRouteResponse> {

        for (

            const provider

            of this.providers

        ) {

            try {

                return await provider.route(

                    request

                );

            }

            catch {

                continue;

            }

        }

        throw new Error(

            "Unable to calculate route."

        );

    }










    /**
     * ----------------------------------------------------------
     * Alternative Routes
     * ----------------------------------------------------------
     */
    async alternatives(

        request: IRouteRequest

    ): Promise<IRouteResponse[]> {

        const route =

        await this.calculate(

            request

        );

        return [

            route

        ];

    }










    /**
     * ----------------------------------------------------------
     * Estimate Arrival Time
     * ----------------------------------------------------------
     */
    estimateETA(

        durationSeconds: number

    ): Date {

        return new Date(

            Date.now() +

            durationSeconds * 1000

        );

    }

}
/**
 * ----------------------------------------------------------
 * Multi-stop Route
 * ----------------------------------------------------------
 */
async multiStop(

    origin: ICoordinate,

    stops: ICoordinate[],

    destination: ICoordinate

): Promise<IRouteResponse[]> {

    const routes: IRouteResponse[] = [];

    let current = origin;

    for (

        const stop

        of stops

    ) {

        routes.push(

            await this.calculate({

                origin: current,

                destination: stop,

                travelMode: "DRIVING" as any,

                preference: "FASTEST" as any

            })

        );

        current = stop;

    }

    routes.push(

        await this.calculate({

            origin: current,

            destination,

            travelMode: "DRIVING" as any,

            preference: "FASTEST" as any

        })

    );

    return routes;

}