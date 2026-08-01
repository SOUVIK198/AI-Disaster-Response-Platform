/**
 * ------------------------------------------------------------------
 * File: hospital.controller.ts
 *
 * HTTP Controller Layer
 *
 * ------------------------------------------------------------------
 */


import {
    Request,
    Response,
    NextFunction
} from "express";



import hospitalService
from "./hospital.service";






class HospitalController {





    /**
     * Create Hospital
     *
     * POST /hospitals
     */
    async createHospital(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const hospital =

            await hospitalService
            .createHospital(

                req.body

            );



            res.status(201)
            .json({

                success:true,

                message:
                "Hospital registered successfully",


                data:hospital


            });


        }

        catch(error){

            next(error);

        }


    }









    /**
     * Get Hospital
     *
     * GET /hospitals/:id
     */
    async getHospital(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const hospital =

            await hospitalService
            .getHospitalById(

                req.params.id

            );



            res.status(200)
            .json({

                success:true,

                data:hospital


            });



        }

        catch(error){

            next(error);

        }

    }









    /**
     * Get All Hospitals
     *
     * GET /hospitals
     */
    async getHospitals(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const limit =

            Number(
                req.query.limit
            ) || 50;



            const hospitals =

            await hospitalService
            .getHospitals(

                limit

            );



            res.status(200)
            .json({

                success:true,

                count:
                hospitals.length,


                data:hospitals


            });


        }

        catch(error){

            next(error);

        }


    }









    /**
     * Update Hospital
     *
     * PATCH /hospitals/:id
     */
    async updateHospital(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const hospital =

            await hospitalService
            .updateHospital(

                req.params.id,

                req.body

            );



            res.status(200)
            .json({

                success:true,

                message:
                "Hospital updated",


                data:hospital


            });



        }

        catch(error){

            next(error);

        }


    }









    /**
     * Delete Hospital
     *
     * DELETE /hospitals/:id
     */
    async deleteHospital(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const hospital =

            await hospitalService
            .deleteHospital(

                req.params.id

            );



            res.status(200)
            .json({

                success:true,

                message:
                "Hospital deactivated",


                data:hospital


            });



        }

        catch(error){

            next(error);

        }


    }









    /**
     * Find Nearby Hospitals
     *
     * GET /hospitals/nearby
     */
    async getNearbyHospitals(
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




            const hospitals =

            await hospitalService
            .getNearbyHospitals(

                Number(longitude),

                Number(latitude),

                Number(radius) || 10000


            );




            res.status(200)
            .json({

                success:true,

                count:
                hospitals.length,


                data:hospitals


            });



        }

        catch(error){

            next(error);

        }


    }









    /**
     * Find Best Hospital
     *
     * GET /hospitals/best
     */
    async findBestHospital(
        req:Request,
        res:Response,
        next:NextFunction
    ){


        try{


            const {

                longitude,

                latitude,

                emergencyLevel


            } = req.query;




            const hospital =

            await hospitalService
            .findBestHospital(

                Number(longitude),

                Number(latitude),

                String(emergencyLevel)


            );




            res.status(200)
            .json({

                success:true,

                data:hospital


            });



        }

        catch(error){

            next(error);

        }


    }



}


export default new HospitalController();
/**
 * Update Bed Availability
 *
 * PATCH
 * /hospitals/:id/beds
 */
async updateBedAvailability(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const {

            bedType,

            available

        } = req.body;




        const hospital =

        await hospitalService
        .updateBedAvailability(

            req.params.id,

            bedType,

            available

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Bed availability updated",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Allocate Bed
 *
 * POST
 * /hospitals/:id/beds/allocate
 */
async allocateBed(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospital =

        await hospitalService
        .allocateBed(

            req.params.id,

            req.body.bedType

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Bed allocated",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Release Bed
 *
 * POST
 * /hospitals/:id/beds/release
 */
async releaseBed(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospital =

        await hospitalService
        .releaseBed(

            req.params.id,

            req.body.bedType

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Bed released",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Update ICU Capacity
 *
 * PATCH
 * /hospitals/:id/icu
 */
async updateICU(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospital =

        await hospitalService
        .updateICUCapacity(

            req.params.id,

            req.body

        );



        res.status(200)
        .json({

            success:true,

            message:
            "ICU capacity updated",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Update Blood Inventory
 *
 * PATCH
 * /hospitals/:id/blood
 */
async updateBlood(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const {

            bloodGroup,

            units

        } = req.body;




        const hospital =

        await hospitalService
        .updateBloodInventory(

            req.params.id,

            bloodGroup,

            units

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Blood inventory updated",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Find Blood Availability
 *
 * GET
 * /hospitals/blood/:group
 */
async findBlood(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospitals =

        await hospitalService
        .findBlood(

            req.params.group

        );



        res.status(200)
        .json({

            success:true,

            count:
            hospitals.length,


            data:hospitals


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Update Ambulance Status
 *
 * PATCH
 * /hospitals/:id/ambulance
 */
async updateAmbulance(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const {

            ambulanceNumber,

            status

        } = req.body;




        const hospital =

        await hospitalService
        .updateAmbulanceStatus(

            req.params.id,

            ambulanceNumber,

            status

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Ambulance status updated",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Admit Emergency Patient
 *
 * POST
 * /hospitals/:id/admit
 */
async admitPatient(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospital =

        await hospitalService
        .admitEmergencyPatient(

            req.params.id

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Patient admitted",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Discharge Patient
 *
 * POST
 * /hospitals/:id/discharge
 */
async dischargePatient(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const hospital =

        await hospitalService
        .dischargePatient(

            req.params.id

        );



        res.status(200)
        .json({

            success:true,

            message:
            "Patient discharged",


            data:hospital


        });



    }

    catch(error){

        next(error);

    }

}









/**
 * Hospital Analytics
 *
 * GET
 * /hospitals/analytics
 */
async getStatistics(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{


        const stats =

        await hospitalService
        .getHospitalStatistics();



        res.status(200)
        .json({

            success:true,

            data:stats


        });



    }

    catch(error){

        next(error);

    }

}