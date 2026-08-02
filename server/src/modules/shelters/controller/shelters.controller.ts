


/**
 * ------------------------------------------------------------------
 * File: shelter.controller.ts
 *
 * HTTP Controller
 * ------------------------------------------------------------------
 */

import {
    Request,
    Response,
    NextFunction
} from "express";

import shelterService
from "./shelter.service";

class ShelterController {

    /**
     * Create Shelter
     * POST /shelters
     */
    async createShelter(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const shelter =

            await shelterService.createShelter(
                req.body
            );

            res.status(201).json({

                success:true,

                message:
                "Shelter created successfully",

                data:shelter

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * Get Shelter
     * GET /shelters/:id
     */
    async getShelter(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const shelter =

            await shelterService.getShelterById(

                req.params.id

            );

            res.status(200).json({

                success:true,

                data:shelter

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * Get All Shelters
     * GET /shelters
     */
    async getShelters(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const limit =

                Number(req.query.limit) || 50;

            const shelters =

            await shelterService.getShelters(
                limit
            );

            res.status(200).json({

                success:true,

                count:shelters.length,

                data:shelters

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * Update Shelter
     * PATCH /shelters/:id
     */
    async updateShelter(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const shelter =

            await shelterService.updateShelter(

                req.params.id,

                req.body

            );

            res.status(200).json({

                success:true,

                message:
                "Shelter updated",

                data:shelter

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * Delete Shelter
     * DELETE /shelters/:id
     */
    async deleteShelter(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const shelter =

            await shelterService.deleteShelter(

                req.params.id

            );

            res.status(200).json({

                success:true,

                message:
                "Shelter deactivated",

                data:shelter

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * Nearby Shelters
     * GET /shelters/nearby
     */
    async getNearbyShelters(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const {

                longitude,

                latitude,

                radius

            } = req.query;

            const shelters =

            await shelterService.getNearbyShelters(

                Number(longitude),

                Number(latitude),

                Number(radius) || 10000

            );

            res.status(200).json({

                success:true,

                count:shelters.length,

                data:shelters

            });

        }

        catch(error){

            next(error);

        }

    }










    /**
     * AI Shelter Recommendation
     * GET /shelters/recommend
     */
    async recommendShelter(
        req:Request,
        res:Response,
        next:NextFunction
    ){

        try{

            const {

                longitude,

                latitude,

                people

            } = req.query;

            const shelter =

            await shelterService.recommendShelter(

                Number(longitude),

                Number(latitude),

                Number(people)

            );

            res.status(200).json({

                success:true,

                data:shelter

            });

        }

        catch(error){

            next(error);

        }

    }

}

export default new ShelterController();
/**
 * ----------------------------------------------------------
 * Update Shelter Capacity
 * PATCH /shelters/:id/capacity
 * ----------------------------------------------------------
 */
async updateCapacity(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateCapacity(

            req.params.id,

            req.body.currentOccupancy

        );

        res.status(200).json({

            success: true,

            message:
            "Shelter capacity updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Admit Evacuees
 * POST /shelters/:id/admit
 * ----------------------------------------------------------
 */
async admitEvacuees(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.admitEvacuees(

            req.params.id,

            req.body.people

        );

        res.status(200).json({

            success: true,

            message:
            "Evacuees admitted successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Release Evacuees
 * POST /shelters/:id/release
 * ----------------------------------------------------------
 */
async releaseEvacuees(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.releaseEvacuees(

            req.params.id,

            req.body.people

        );

        res.status(200).json({

            success: true,

            message:
            "Evacuees released successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Replace Resource Inventory
 * PATCH /shelters/:id/resources
 * ----------------------------------------------------------
 */
async updateResources(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateResources(

            req.params.id,

            req.body.resources

        );

        res.status(200).json({

            success: true,

            message:
            "Resources updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Add Single Resource
 * POST /shelters/:id/resources
 * ----------------------------------------------------------
 */
async addResource(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.addResource(

            req.params.id,

            req.body

        );

        res.status(200).json({

            success: true,

            message:
            "Resource added successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Update Facilities
 * PATCH /shelters/:id/facilities
 * ----------------------------------------------------------
 */
async updateFacilities(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateFacilities(

            req.params.id,

            req.body.facilities

        );

        res.status(200).json({

            success: true,

            message:
            "Facilities updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Update Shelter Staff
 * PATCH /shelters/:id/staff
 * ----------------------------------------------------------
 */
async updateStaff(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateStaff(

            req.params.id,

            req.body.staff

        );

        res.status(200).json({

            success: true,

            message:
            "Staff updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Shelter Analytics
 * GET /shelters/analytics
 * ----------------------------------------------------------
 */
async getStatistics(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const analytics =

        await shelterService.getShelterStatistics();

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
 * Shelter Leaderboard
 * GET /shelters/leaderboard
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

        const shelters =

        await shelterService.getTopShelters(
            limit
        );

        res.status(200).json({

            success: true,

            count: shelters.length,

            data: shelters

        });

    }

    catch (error) {

        next(error);

    }

}