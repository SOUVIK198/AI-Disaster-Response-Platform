/**
 * ------------------------------------------------------------------
 * File: ngo.controller.ts
 *
 * NGO HTTP Controller
 * ------------------------------------------------------------------
 */

import {

    Request,

    Response,

    NextFunction

} from "express";

import ngoService
from "./ngo.service";

class NGOController {

    /**
     * ----------------------------------------------------------
     * Register NGO
     * ----------------------------------------------------------
     * POST /ngos
     */
    async createNGO(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ngo =

            await ngoService.createNGO(
                req.body
            );

            res.status(201).json({

                success: true,

                message:
                "NGO registered successfully",

                data: ngo

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Get NGO By ID
     * ----------------------------------------------------------
     * GET /ngos/:id
     */
    async getNGO(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ngo =

            await ngoService.getNGOById(

                req.params.id

            );

            res.status(200).json({

                success: true,

                data: ngo

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Get All NGOs
     * ----------------------------------------------------------
     * GET /ngos
     */
    async getNGOs(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const limit =

                Number(req.query.limit) || 50;

            const ngos =

            await ngoService.getNGOs(
                limit
            );

            res.status(200).json({

                success: true,

                count: ngos.length,

                data: ngos

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Update NGO
     * ----------------------------------------------------------
     * PATCH /ngos/:id
     */
    async updateNGO(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ngo =

            await ngoService.updateNGO(

                req.params.id,

                req.body

            );

            res.status(200).json({

                success: true,

                message:
                "NGO updated successfully",

                data: ngo

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Delete NGO
     * ----------------------------------------------------------
     * DELETE /ngos/:id
     */
    async deleteNGO(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ngo =

            await ngoService.deleteNGO(

                req.params.id

            );

            res.status(200).json({

                success: true,

                message:
                "NGO deactivated successfully",

                data: ngo

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Nearby NGOs
     * ----------------------------------------------------------
     * GET /ngos/nearby
     */
    async getNearbyNGOs(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const {

                longitude,

                latitude,

                radius

            } = req.query;

            const ngos =

            await ngoService.getNearbyNGOs(

                Number(longitude),

                Number(latitude),

                Number(radius) || 10000

            );

            res.status(200).json({

                success: true,

                count: ngos.length,

                data: ngos

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Verify NGO
     * ----------------------------------------------------------
     * PATCH /ngos/:id/verify
     */
    async verifyNGO(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ngo =

            await ngoService.verifyNGO(

                req.params.id

            );

            res.status(200).json({

                success: true,

                message:
                "NGO verified successfully",

                data: ngo

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new NGOController();
/**
 * ----------------------------------------------------------
 * Replace Inventory
 * PATCH /ngos/:id/inventory
 * ----------------------------------------------------------
 */
async updateInventory(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.updateInventory(

            req.params.id,

            req.body.inventory

        );

        res.status(200).json({

            success: true,

            message:
            "Inventory updated successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Add Inventory Item
 * POST /ngos/:id/inventory
 * ----------------------------------------------------------
 */
async addInventoryItem(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.addInventoryItem(

            req.params.id,

            req.body

        );

        res.status(201).json({

            success: true,

            message:
            "Inventory item added successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Replace Vehicles
 * PATCH /ngos/:id/vehicles
 * ----------------------------------------------------------
 */
async updateVehicles(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.updateVehicles(

            req.params.id,

            req.body.vehicles

        );

        res.status(200).json({

            success: true,

            message:
            "Vehicles updated successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Add Vehicle
 * POST /ngos/:id/vehicles
 * ----------------------------------------------------------
 */
async addVehicle(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.addVehicle(

            req.params.id,

            req.body

        );

        res.status(201).json({

            success: true,

            message:
            "Vehicle added successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Assign Disaster
 * POST /ngos/:id/assignments
 * ----------------------------------------------------------
 */
async assignIncident(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.assignIncident(

            req.params.id,

            req.body

        );

        res.status(200).json({

            success: true,

            message:
            "Incident assigned successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Complete Assignment
 * PATCH /ngos/:id/assignments/:assignmentId
 * ----------------------------------------------------------
 */
async completeAssignment(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.completeAssignment(

            req.params.id,

            req.params.assignmentId

        );

        res.status(200).json({

            success: true,

            message:
            "Assignment completed successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Add Donation
 * POST /ngos/:id/donations
 * ----------------------------------------------------------
 */
async addDonation(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const ngo =

        await ngoService.addDonation(

            req.params.id,

            req.body

        );

        res.status(201).json({

            success: true,

            message:
            "Donation added successfully",

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * NGO Analytics
 * GET /ngos/analytics
 * ----------------------------------------------------------
 */
async getStatistics(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const analytics =

        await ngoService.getStatistics();

        res.status(200).json({

            success: true,

            data: analytics

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * NGO Leaderboard
 * GET /ngos/leaderboard
 * ----------------------------------------------------------
 */
async getLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const limit =

            Number(req.query.limit) || 10;

        const ngos =

        await ngoService.getTopNGOs(
            limit
        );

        res.status(200).json({

            success: true,

            count: ngos.length,

            data: ngos

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * AI NGO Recommendation
 * GET /ngos/recommend
 * ----------------------------------------------------------
 */
async recommendNGO(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const {

            longitude,

            latitude,

            priority

        } = req.query;

        const ngo =

        await ngoService.recommendNGO(

            Number(longitude),

            Number(latitude),

            String(priority)

        );

        res.status(200).json({

            success: true,

            data: ngo

        });

    }

    catch (error) {

        next(error);

    }

}