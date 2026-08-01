/**
 * ------------------------------------------------------------------
 * File: hospital.repository.ts
 *
 * Database Layer for Hospital Module
 *
 * ------------------------------------------------------------------
 */


import {
    Hospital,
    IHospitalDocument
} from "./hospital.model";



import {
    IHospital
} from "./hospital.interface";







class HospitalRepository {




    /**
     * Create Hospital
     */
    async create(
        data:Partial<IHospital>
    ){


        return await Hospital.create(
            data
        );


    }









    /**
     * Find hospital by id
     */
    async findById(
        id:string
    ){


        return await Hospital
        .findById(id);


    }









    /**
     * Find hospital by registration number
     */
    async findByRegistrationNumber(
        registrationNumber:string
    ){


        return await Hospital
        .findOne({

            registrationNumber

        });


    }









    /**
     * Get all hospitals
     */
    async findAll(
        limit:number = 50
    ){


        return await Hospital
        .find({

            isActive:true

        })

        .limit(limit);


    }









    /**
     * Update hospital
     */
    async update(
        id:string,
        data:Partial<IHospital>
    ){


        return await Hospital
        .findByIdAndUpdate(

            id,

            data,

            {

                new:true

            }

        );


    }









    /**
     * Delete hospital
     */
    async delete(
        id:string
    ){


        return await Hospital
        .findByIdAndUpdate(

            id,

            {

                isActive:false

            },

            {

                new:true

            }

        );


    }









    /**
     * Find nearest hospitals
     *
     * MongoDB Geo Query
     */
    async findNearby(
        longitude:number,
        latitude:number,
        radius:number = 10000
    ){


        return await Hospital.find({

            location:{

                $near:{

                    $geometry:{


                        type:"Point",


                        coordinates:[

                            longitude,

                            latitude

                        ]

                    },


                    $maxDistance:radius


                }

            },


            isActive:true


        });


    }









    /**
     * Find available emergency hospitals
     */
    async findEmergencyReady()
    {


        return await Hospital.find({

            status:"ACTIVE",


            "emergencyCapacity.acceptingPatients":

            true,


            isActive:true


        });


    }





}


export default new HospitalRepository();
/**
 * Update bed availability
 */
async updateBedAvailability(
    hospitalId:string,
    bedType:string,
    available:number
){


    return await Hospital.findOneAndUpdate(

        {

            _id:hospitalId,

            "beds.type":bedType

        },


        {

            $set:{

                "beds.$.available":available

            }

        },


        {

            new:true

        }

    );


}









/**
 * Increase occupied beds
 */
async occupyBed(
    hospitalId:string,
    bedType:string
){


    return await Hospital.findOneAndUpdate(

        {

            _id:hospitalId,

            "beds.type":bedType,

            "beds.available":
            {
                $gt:0
            }

        },


        {

            $inc:{

                "beds.$.available":-1,

                "beds.$.occupied":1

            }

        },


        {

            new:true

        }

    );


}









/**
 * Release occupied bed
 */
async releaseBed(
    hospitalId:string,
    bedType:string
){


    return await Hospital.findOneAndUpdate(

        {

            _id:hospitalId,

            "beds.type":bedType

        },


        {

            $inc:{

                "beds.$.available":1,

                "beds.$.occupied":-1

            }

        },


        {

            new:true

        }

    );


}









/**
 * Update ICU capacity
 */
async updateICUCapacity(
    hospitalId:string,
    data:any
){


    return await Hospital.findByIdAndUpdate(

        hospitalId,


        {


            $set:{

                icu:data

            }


        },


        {

            new:true

        }

    );


}









/**
 * Update blood inventory
 */
async updateBloodInventory(
    hospitalId:string,
    bloodGroup:string,
    units:number
){


    return await Hospital.findOneAndUpdate(

        {

            _id:hospitalId,

            "bloodInventory.bloodGroup":
            bloodGroup

        },


        {

            $set:{

                "bloodInventory.$.units":
                units,


                "bloodInventory.$.lastUpdated":
                new Date()

            }

        },


        {

            new:true

        }

    );


}









/**
 * Add blood stock
 */
async addBloodStock(
    hospitalId:string,
    bloodGroup:string,
    units:number
){


    return await Hospital.findByIdAndUpdate(

        hospitalId,


        {

            $push:{

                bloodInventory:{


                    bloodGroup,


                    units,


                    lastUpdated:
                    new Date()


                }

            }

        },


        {

            new:true

        }

    );


}









/**
 * Update ambulance status
 */
async updateAmbulanceStatus(
    hospitalId:string,
    ambulanceNumber:string,
    status:string
){


    return await Hospital.findOneAndUpdate(

        {

            _id:hospitalId,

            "ambulances.ambulanceNumber":
            ambulanceNumber

        },


        {

            $set:{

                "ambulances.$.status":
                status

            }

        },


        {

            new:true

        }

    );


}









/**
 * Add patient count
 */
async addEmergencyPatient(
    hospitalId:string
){


    return await Hospital.findByIdAndUpdate(

        hospitalId,


        {


            $inc:{

                "emergencyCapacity.currentPatients":
                1

            }


        },


        {

            new:true

        }

    );


}









/**
 * Remove patient
 */
async removeEmergencyPatient(
    hospitalId:string
){


    return await Hospital.findByIdAndUpdate(

        hospitalId,


        {


            $inc:{

                "emergencyCapacity.currentPatients":
                -1

            }


        },


        {

            new:true

        }

    );


}









/**
 * Hospital statistics
 */
async getStatistics()
{


    const total =

    await Hospital.countDocuments({

        isActive:true

    });



    const active =

    await Hospital.countDocuments({

        status:"ACTIVE"

    });



    return {


        totalHospitals:total,


        activeHospitals:active


    };


}