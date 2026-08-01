/**
 * ------------------------------------------------------------------
 * File: hospital.service.ts
 *
 * Business Logic Layer
 *
 * ------------------------------------------------------------------
 */


import hospitalRepository 
from "./hospital.repository";



import {

    IHospital

} from "./hospital.interface";





class HospitalService {






    /**
     * Register hospital
     */
    async createHospital(
        data:Partial<IHospital>
    ){


        const existing =

        await hospitalRepository
        .findByRegistrationNumber(

            data.registrationNumber!

        );



        if(existing){

            throw new Error(

                "Hospital already registered"

            );

        }





        return await hospitalRepository
        .create(data);


    }









    /**
     * Get hospital profile
     */
    async getHospitalById(
        id:string
    ){


        const hospital =

        await hospitalRepository
        .findById(id);



        if(!hospital){

            throw new Error(

                "Hospital not found"

            );

        }



        return hospital;


    }









    /**
     * Get all hospitals
     */
    async getHospitals(
        limit:number = 50
    ){


        return await hospitalRepository
        .findAll(limit);


    }









    /**
     * Update hospital
     */
    async updateHospital(
        id:string,
        data:any
    ){


        const hospital =

        await hospitalRepository
        .findById(id);



        if(!hospital){

            throw new Error(

                "Hospital not found"

            );

        }



        return await hospitalRepository
        .update(

            id,

            data

        );


    }









    /**
     * Deactivate hospital
     */
    async deleteHospital(
        id:string
    ){


        return await hospitalRepository
        .delete(id);


    }









    /**
     * Find nearby hospitals
     */
    async getNearbyHospitals(
        longitude:number,
        latitude:number,
        radius:number
    ){



        return await hospitalRepository
        .findNearby(

            longitude,

            latitude,

            radius

        );


    }









    /**
     * Find emergency ready hospitals
     */
    async getEmergencyReadyHospitals()
    {


        return await hospitalRepository
        .findEmergencyReady();


    }








    /**
     * Smart hospital selection
     *
     * Used by AI incident module
     */
    async findBestHospital(
        longitude:number,
        latitude:number,
        emergencyLevel:string
    ){


        const hospitals =

        await hospitalRepository
        .findNearby(

            longitude,

            latitude,

            50000

        );





        const available =

        hospitals.filter(

            hospital=>

            hospital
            .emergencyCapacity
            .acceptingPatients === true

        );





        if(
            available.length===0
        ){

            throw new Error(

                "No available hospital"

            );

        }






        /**
         * Ranking algorithm
         *
         * Priority:
         *
         * 1. Distance
         * 2. ICU availability
         * 3. Emergency capacity
         */

        return available.sort(

            (a:any,b:any)=>{


                const aICU =

                a.icu.availableBeds;



                const bICU =

                b.icu.availableBeds;



                return bICU-aICU;


            }

        )[0];


    }





}



export default new HospitalService();
/**
 * Update bed availability
 */
async updateBedAvailability(
    hospitalId:string,
    bedType:string,
    available:number
){

    const hospital =

    await hospitalRepository
    .findById(
        hospitalId
    );


    if(!hospital){

        throw new Error(
            "Hospital not found"
        );

    }



    return await hospitalRepository
    .updateBedAvailability(

        hospitalId,

        bedType,

        available

    );

}









/**
 * Allocate bed to patient
 */
async allocateBed(
    hospitalId:string,
    bedType:string
){


    const hospital =

    await hospitalRepository
    .findById(
        hospitalId
    );


    if(!hospital){

        throw new Error(
            "Hospital not found"
        );

    }



    const bed =

    hospital.beds.find(

        (item:any)=>

        item.type === bedType

    );




    if(
        !bed ||
        bed.available <= 0
    ){

        throw new Error(

            "No beds available"

        );

    }





    return await hospitalRepository
    .occupyBed(

        hospitalId,

        bedType

    );

}









/**
 * Release bed
 */
async releaseBed(
    hospitalId:string,
    bedType:string
){


    return await hospitalRepository
    .releaseBed(

        hospitalId,

        bedType

    );

}









/**
 * Update ICU availability
 */
async updateICUCapacity(
    hospitalId:string,
    data:any
){


    const hospital =

    await hospitalRepository
    .findById(
        hospitalId
    );


    if(!hospital){

        throw new Error(
            "Hospital not found"
        );

    }




    return await hospitalRepository
    .updateICUCapacity(

        hospitalId,

        data

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


    return await hospitalRepository
    .updateBloodInventory(

        hospitalId,

        bloodGroup,

        units

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



    return await hospitalRepository
    .addBloodStock(

        hospitalId,

        bloodGroup,

        units

    );

}









/**
 * Find blood availability
 */
async findBlood(
    bloodGroup:string
){


    const hospitals =

    await hospitalRepository
    .findAll(
        100
    );



    return hospitals.filter(

        (hospital:any)=>

        hospital.bloodInventory
        .some(

            (blood:any)=>

            blood.bloodGroup === bloodGroup

            &&

            blood.units > 0

        )

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


    return await hospitalRepository
    .updateAmbulanceStatus(

        hospitalId,

        ambulanceNumber,

        status

    );

}









/**
 * Add emergency patient
 */
async admitEmergencyPatient(
    hospitalId:string
){


    const hospital =

    await hospitalRepository
    .findById(
        hospitalId
    );



    if(!hospital){

        throw new Error(
            "Hospital not found"
        );

    }





    if(

        hospital
        .emergencyCapacity
        .currentPatients

        >=

        hospital
        .emergencyCapacity
        .maximumCapacity

    ){

        throw new Error(

            "Emergency capacity full"

        );

    }




    return await hospitalRepository
    .addEmergencyPatient(

        hospitalId

    );

}









/**
 * Discharge patient
 */
async dischargePatient(
    hospitalId:string
){


    return await hospitalRepository
    .removeEmergencyPatient(

        hospitalId

    );

}









/**
 * Hospital analytics
 */
async getHospitalStatistics()
{


    return await hospitalRepository
    .getStatistics();


}