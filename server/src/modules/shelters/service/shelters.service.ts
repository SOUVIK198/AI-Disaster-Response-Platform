/**
 * ------------------------------------------------------------------
 * File: shelter.service.ts
 *
 * Business Logic Layer
 *
 * ------------------------------------------------------------------
 */

import shelterRepository from "./shelter.repository";

import { IShelter } from "./shelter.interface";

class ShelterService {

    /**
     * Register Shelter
     */
    async createShelter(
        data: Partial<IShelter>
    ){

        const existing =

        await shelterRepository
        .findByCode(
            data.shelterCode!
        );

        if(existing){

            throw new Error(
                "Shelter already exists"
            );

        }

        return shelterRepository.create(data);

    }










    /**
     * Get Shelter
     */
    async getShelterById(
        id:string
    ){

        const shelter =

        await shelterRepository
        .findById(id);

        if(!shelter){

            throw new Error(
                "Shelter not found"
            );

        }

        return shelter;

    }










    /**
     * Get All Shelters
     */
    async getShelters(
        limit:number=50
    ){

        return shelterRepository.findAll(limit);

    }










    /**
     * Update Shelter
     */
    async updateShelter(
        id:string,
        data:Partial<IShelter>
    ){

        const shelter =

        await shelterRepository
        .findById(id);

        if(!shelter){

            throw new Error(
                "Shelter not found"
            );

        }

        return shelterRepository.update(
            id,
            data
        );

    }










    /**
     * Delete Shelter
     */
    async deleteShelter(
        id:string
    ){

        return shelterRepository.delete(id);

    }










    /**
     * Nearby Shelters
     */
    async getNearbyShelters(

        longitude:number,

        latitude:number,

        radius:number

    ){

        return shelterRepository.findNearby(

            longitude,

            latitude,

            radius

        );

    }










    /**
     * Available Shelters
     */
    async getAvailableShelters(){

        return shelterRepository.findAvailable();

    }










    /**
     * AI Shelter Recommendation
     */
    async findBestShelter(

        longitude:number,

        latitude:number

    ){

        const shelters =

        await shelterRepository.findNearby(

            longitude,

            latitude,

            50000

        );



        const available =

        shelters.filter(

            shelter=>

            shelter.capacity
            .availableCapacity > 0

        );



        if(
            available.length===0
        ){

            throw new Error(
                "No shelters available"
            );

        }



        return available.sort(

            (a,b)=>

            b.capacity.availableCapacity

            -

            a.capacity.availableCapacity

        )[0];

    }

}

export default new ShelterService();
/**
 * ----------------------------------------------------------
 * Update Shelter Capacity
 * ----------------------------------------------------------
 */
async updateCapacity(
    shelterId:string,
    currentOccupancy:number
){

    const shelter =
    await shelterRepository.findById(
        shelterId
    );

    if(!shelter){

        throw new Error(
            "Shelter not found"
        );

    }

    if(
        currentOccupancy >
        shelter.capacity.totalCapacity
    ){

        throw new Error(
            "Capacity exceeded"
        );

    }

    return shelterRepository.updateCapacity(
        shelterId,
        currentOccupancy
    );

}









/**
 * ----------------------------------------------------------
 * Admit Evacuees
 * ----------------------------------------------------------
 */
async admitEvacuees(
    shelterId:string,
    people:number
){

    const shelter =
    await shelterRepository.findById(
        shelterId
    );

    if(!shelter){

        throw new Error(
            "Shelter not found"
        );

    }

    if(
        shelter.capacity.availableCapacity
        < people
    ){

        throw new Error(
            "Not enough capacity"
        );

    }

    return shelterRepository.admitEvacuees(

        shelterId,

        people

    );

}









/**
 * ----------------------------------------------------------
 * Release Evacuees
 * ----------------------------------------------------------
 */
async releaseEvacuees(
    shelterId:string,
    people:number
){

    const shelter =
    await shelterRepository.findById(
        shelterId
    );

    if(!shelter){

        throw new Error(
            "Shelter not found"
        );

    }

    if(
        people >
        shelter.capacity.currentOccupancy
    ){

        throw new Error(
            "Invalid release count"
        );

    }

    return shelterRepository.releaseEvacuees(

        shelterId,

        people

    );

}









/**
 * ----------------------------------------------------------
 * Replace Resource Inventory
 * ----------------------------------------------------------
 */
async updateResources(
    shelterId:string,
    resources:any[]
){

    return shelterRepository.updateResources(

        shelterId,

        resources

    );

}









/**
 * ----------------------------------------------------------
 * Add Resource
 * ----------------------------------------------------------
 */
async addResource(
    shelterId:string,
    resource:any
){

    return shelterRepository.addResource(

        shelterId,

        resource

    );

}









/**
 * ----------------------------------------------------------
 * Update Facilities
 * ----------------------------------------------------------
 */
async updateFacilities(
    shelterId:string,
    facilities:any[]
){

    return shelterRepository.updateFacilities(

        shelterId,

        facilities

    );

}









/**
 * ----------------------------------------------------------
 * Update Staff
 * ----------------------------------------------------------
 */
async updateStaff(
    shelterId:string,
    staff:any[]
){

    return shelterRepository.updateStaff(

        shelterId,

        staff

    );

}









/**
 * ----------------------------------------------------------
 * Shelter Analytics
 * ----------------------------------------------------------
 */
async getShelterStatistics(){

    return shelterRepository.getStatistics();

}









/**
 * ----------------------------------------------------------
 * Top Shelters
 * ----------------------------------------------------------
 */
async getTopShelters(
    limit:number=10
){

    return shelterRepository.getShelterLeaderboard(
        limit
    );

}









/**
 * ----------------------------------------------------------
 * Occupancy Percentage
 * ----------------------------------------------------------
 */
calculateOccupancyPercentage(
    shelter:any
){

    return (

        shelter.capacity.currentOccupancy

        /

        shelter.capacity.totalCapacity

    ) * 100;

}









/**
 * ----------------------------------------------------------
 * AI Evacuation Recommendation
 * ----------------------------------------------------------
 */
async recommendShelter(

    longitude:number,

    latitude:number,

    people:number

){

    const shelters =

    await shelterRepository.findNearby(

        longitude,

        latitude,

        50000

    );

    const suitable = shelters.filter(

        shelter =>

        shelter.capacity.availableCapacity
        >= people

    );

    if(
        suitable.length===0
    ){

        throw new Error(

            "No shelter can accommodate the group"

        );

    }

    suitable.sort(

        (a,b)=>{

            const scoreA =

                a.capacity.availableCapacity;

            const scoreB =

                b.capacity.availableCapacity;

            return scoreB-scoreA;

        }

    );

    return suitable[0];

}