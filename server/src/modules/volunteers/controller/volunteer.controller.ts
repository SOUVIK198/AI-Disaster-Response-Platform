/**
 * ------------------------------------------------------------------
 * File: volunteer.controller.ts
 *
 * HTTP Controller Layer
 *
 * Request
 *    |
 * Controller
 *    |
 * Service
 *    |
 * Repository
 *    |
 * Database
 * ------------------------------------------------------------------
 */


import { Request, Response, NextFunction } from "express";


import volunteerService from "./volunteer.service";




class VolunteerController {



    /**
     * Create volunteer
     *
     * POST /volunteers
     */
    async createVolunteer(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const volunteer =

            await volunteerService
            .createVolunteer(
                req.body
            );



            res.status(201)
            .json({

                success:true,

                message:
                "Volunteer created successfully",

                data:volunteer

            });


        }

        catch(error){

            next(error);

        }

    }









    /**
     * Get volunteer by id
     *
     * GET /volunteers/:id
     */
    async getVolunteer(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const volunteer =

            await volunteerService
            .getVolunteerById(

                req.params.id

            );



            res.status(200)
            .json({

                success:true,

                data:volunteer

            });


        }

        catch(error){

            next(error);

        }


    }









    /**
     * Update volunteer profile
     *
     * PATCH /volunteers/:id
     */
    async updateVolunteer(
        req:Request,
        res:Response,
        next:NextFunction
    ){



        try{


            const volunteer =

            await volunteerService
            .updateVolunteer(

                req.params.id,

                req.body

            );



            res.status(200)
            .json({

                success:true,

                message:
                "Volunteer updated",

                data:volunteer

            });


        }

        catch(error){

            next(error);

        }


    }









    /**
     * Delete volunteer
     *
     * DELETE /volunteers/:id
     */
    async deleteVolunteer(
        req:Request,
        res:Response,
        next:NextFunction
    ){



        try{


            const result =

            await volunteerService
            .deleteVolunteer(

                req.params.id

            );



            res.status(200)
            .json({

                success:true,

                ...result

            });


        }

        catch(error){

            next(error);

        }

    }





}



export default new VolunteerController();
/**
 * Update volunteer location
 *
 * PATCH /volunteers/:id/location
 */
async updateLocation(
    req:Request,
    res:Response,
    next:NextFunction
){


    try{


        const {
            longitude,
            latitude,
            address
        } = req.body;



        const volunteer =

        await volunteerService
        .updateLocation(

            req.params.id,

            longitude,

            latitude,

            address

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Location updated successfully",

            data:volunteer

        });


    }

    catch(error){

        next(error);

    }

}









/**
 * Change volunteer status
 *
 * PATCH /volunteers/:id/status
 */
async changeStatus(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const volunteer =

        await volunteerService
        .changeStatus(

            req.params.id,

            req.body.status

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Status updated",

            data:volunteer

        });


    }

    catch(error){

        next(error);

    }

}









/**
 * Find nearby volunteers
 *
 * GET /volunteers/nearby
 *
 * Query:
 *
 * longitude
 * latitude
 * radius
 */
async getNearbyVolunteers(
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




        const volunteers =

        await volunteerService
        .getNearbyVolunteers(

            Number(longitude),

            Number(latitude),

            Number(radius) || 10000

        );





        res.status(200)
        .json({

            success:true,

            count:
            volunteers.length,

            data:volunteers

        });


    }

    catch(error){

        next(error);

    }


}









/**
 * Get available volunteers
 *
 * GET /volunteers/available
 */
async getAvailableVolunteers(
    req:Request,
    res:Response,
    next:NextFunction
){



    try{


        const limit =

        Number(req.query.limit) || 50;




        const volunteers =

        await volunteerService
        .getAvailableVolunteers(
            limit
        );





        res.status(200)
        .json({

            success:true,

            count:
            volunteers.length,

            data:volunteers

        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Check volunteer availability
 *
 * GET /volunteers/:id/availability
 */
async checkAvailability(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const result =

        await volunteerService
        .checkAvailability(

            req.params.id

        );




        res.status(200)
        .json({

            success:true,

            data:result

        });


    }

    catch(error){

        next(error);

    }


}









/**
 * Get workload
 *
 * GET /volunteers/:id/workload
 */
async getWorkload(
    req:Request,
    res:Response,
    next:NextFunction
){


    try{


        const result =

        await volunteerService
        .getWorkload(

            req.params.id

        );



        res.status(200)
        .json({

            success:true,

            data:result

        });


    }

    catch(error){

        next(error);

    }


}
/**
 * Update volunteer location
 *
 * PATCH /volunteers/:id/location
 */
async updateLocation(
    req:Request,
    res:Response,
    next:NextFunction
){


    try{


        const {
            longitude,
            latitude,
            address
        } = req.body;



        const volunteer =

        await volunteerService
        .updateLocation(

            req.params.id,

            longitude,

            latitude,

            address

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Location updated successfully",

            data:volunteer

        });


    }

    catch(error){

        next(error);

    }

}









/**
 * Change volunteer status
 *
 * PATCH /volunteers/:id/status
 */
async changeStatus(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const volunteer =

        await volunteerService
        .changeStatus(

            req.params.id,

            req.body.status

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Status updated",

            data:volunteer

        });


    }

    catch(error){

        next(error);

    }

}









/**
 * Find nearby volunteers
 *
 * GET /volunteers/nearby
 *
 * Query:
 *
 * longitude
 * latitude
 * radius
 */
async getNearbyVolunteers(
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




        const volunteers =

        await volunteerService
        .getNearbyVolunteers(

            Number(longitude),

            Number(latitude),

            Number(radius) || 10000

        );





        res.status(200)
        .json({

            success:true,

            count:
            volunteers.length,

            data:volunteers

        });


    }

    catch(error){

        next(error);

    }


}









/**
 * Get available volunteers
 *
 * GET /volunteers/available
 */
async getAvailableVolunteers(
    req:Request,
    res:Response,
    next:NextFunction
){



    try{


        const limit =

        Number(req.query.limit) || 50;




        const volunteers =

        await volunteerService
        .getAvailableVolunteers(
            limit
        );





        res.status(200)
        .json({

            success:true,

            count:
            volunteers.length,

            data:volunteers

        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Check volunteer availability
 *
 * GET /volunteers/:id/availability
 */
async checkAvailability(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const result =

        await volunteerService
        .checkAvailability(

            req.params.id

        );




        res.status(200)
        .json({

            success:true,

            data:result

        });


    }

    catch(error){

        next(error);

    }


}









/**
 * Get workload
 *
 * GET /volunteers/:id/workload
 */
async getWorkload(
    req:Request,
    res:Response,
    next:NextFunction
){


    try{


        const result =

        await volunteerService
        .getWorkload(

            req.params.id

        );



        res.status(200)
        .json({

            success:true,

            data:result

        });


    }

    catch(error){

        next(error);

    }


}