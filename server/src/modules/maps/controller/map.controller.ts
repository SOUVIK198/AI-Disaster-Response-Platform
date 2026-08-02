/**
 * ------------------------------------------------------------------
 * File: maps.controller.ts
 * ------------------------------------------------------------------
 */

import {

    Request,
    Response,
    NextFunction

} from "express";

import mapsService
from "./maps.service";

import {

    MapProvider

} from "./maps.types";

class MapsController {

    /**
     * ----------------------------------------------------------
     * Geocode Address
     * POST /maps/geocode
     * ----------------------------------------------------------
     */
    async geocode(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const coordinate =

            await mapsService.geocode(

                req.body.address

            );

            return res.status(200).json({

                success: true,

                message:

                "Address geocoded successfully.",

                data: coordinate

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Reverse Geocode
     * POST /maps/reverse-geocode
     * ----------------------------------------------------------
     */
    async reverseGeocode(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const result =

            await mapsService.reverseGeocode(

                req.body.coordinate

            );

            return res.status(200).json({

                success: true,

                message:

                "Reverse geocoding completed.",

                data: result

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Route Calculation
     * POST /maps/route
     * ----------------------------------------------------------
     */
    async route(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const route =

            await mapsService.route(

                req.body

            );

            return res.status(200).json({

                success: true,

                message:

                "Route calculated successfully.",

                data: route

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Nearby Search
     * POST /maps/nearby
     * ----------------------------------------------------------
     */
    async nearby(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const locations =

            await mapsService.nearby(

                req.body

            );

            return res.status(200).json({

                success: true,

                message:

                "Nearby search completed.",

                data: locations

            });

        }

        catch (error) {

            next(error);

        }

    }

}
/**
 * ----------------------------------------------------------
 * Distance Matrix
 * POST /maps/distance-matrix
 * ----------------------------------------------------------
 */
async distanceMatrix(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const matrix =

        await mapsService.distanceMatrix(

            req.body.origins,

            req.body.destinations

        );

        return res.status(200).json({

            success: true,

            message:

            "Distance matrix calculated successfully.",

            data: matrix

        });

    }

    catch (error) {

        next(error);

    }

}