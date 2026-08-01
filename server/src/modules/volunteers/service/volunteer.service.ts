/**
 * ------------------------------------------------------------------
 * File: volunteer.service.ts
 *
 * Business Logic Layer
 *
 * Responsibilities:
 * - Volunteer management
 * - Mission workflow
 * - AI assignment logic
 * - Repository orchestration
 * ------------------------------------------------------------------
 */


import volunteerRepository from "./volunteer.repository";

import {
    VolunteerStatus,
    MissionStatus,
    SkillType
} from "./volunteer.types";


import {
    IVolunteer
} from "./volunteer.interface";



class VolunteerService {



    /**
     * Create volunteer profile
     */
    async createVolunteer(
        data:any
    ){


        const existing =
        await volunteerRepository
        .findByUserId(
            data.user
        );


        if(existing){

            throw new Error(
                "Volunteer profile already exists"
            );

        }



        return await volunteerRepository
        .createVolunteer(data);


    }








    /**
     * Get volunteer profile
     */
    async getVolunteerById(
        id:string
    ){


        const volunteer =
        await volunteerRepository
        .findById(id);



        if(!volunteer){

            throw new Error(
                "Volunteer not found"
            );

        }



        return volunteer;


    }








    /**
     * Update volunteer profile
     */
    async updateVolunteer(
        id:string,
        data:any
    ){



        const volunteer =
        await volunteerRepository
        .updateVolunteer(
            id,
            data
        );



        if(!volunteer){

            throw new Error(
                "Unable to update volunteer"
            );

        }


        return volunteer;


    }










    /**
     * Delete volunteer
     *
     * Soft delete
     */
    async deleteVolunteer(
        id:string
    ){



        const volunteer =
        await volunteerRepository
        .softDelete(id);



        if(!volunteer){

            throw new Error(
                "Volunteer not found"
            );

        }


        return {

            message:
            "Volunteer deactivated successfully"

        };


    }






}



export default new VolunteerService();
/**
 * Update volunteer live location
 */
async updateLocation(
    id:string,
    longitude:number,
    latitude:number,
    address?:string
){


    const volunteer =
    await volunteerRepository
    .findById(id);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }



    return await volunteerRepository
    .updateLocation(

        id,

        longitude,

        latitude,

        address

    );


}









/**
 * Find nearby volunteers
 *
 * Used by incident response system
 */
async getNearbyVolunteers(
    longitude:number,
    latitude:number,
    radius:number = 10000
){


    return await volunteerRepository
    .findNearby(

        longitude,

        latitude,

        radius

    );


}









/**
 * Change volunteer status
 */
async changeStatus(
    id:string,
    status:VolunteerStatus
){


    const volunteer =
    await volunteerRepository
    .findById(id);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }




    /*
       Business Rule:

       Volunteer cannot become
       AVAILABLE when already
       on active mission
    */

    if(

        volunteer.currentMission &&

        status === VolunteerStatus.AVAILABLE

    ){

        throw new Error(
            "Complete current mission first"
        );

    }





    return await volunteerRepository
    .updateStatus(

        id,

        status

    );


}









/**
 * Check volunteer availability
 */
async checkAvailability(
    id:string
){



    const volunteer =
    await volunteerRepository
    .findById(id);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }





    return {

        available:

        volunteer.status ===
        VolunteerStatus.AVAILABLE,


        status:
        volunteer.status,


        activeMission:
        volunteer.currentMission || null


    };


}









/**
 * Find volunteers by skill
 */
async findBySkill(
    skill:SkillType
){


    return await volunteerRepository
    .findBySkill(skill);


}









/**
 * Get available volunteers
 */
async getAvailableVolunteers(
    limit:number = 50
){


    return await volunteerRepository
    .findAvailable(limit);


}
/**
 * Calculate distance score
 *
 * Lower distance = higher score
 */
private calculateDistanceScore(
    distance:number
):number{


    const maxDistance = 20000; // 20 KM


    if(distance >= maxDistance){

        return 0;

    }


    return (

        (maxDistance - distance)

        /

        maxDistance

    ) * 100;


}








/**
 * Calculate skill matching score
 */
private calculateSkillScore(
    volunteer:IVolunteer,
    requiredSkills:string[]
):number{


    if(
        !requiredSkills ||
        requiredSkills.length===0
    ){

        return 50;

    }



    const volunteerSkills =
    volunteer.skills.map(
        skill=>skill.name
    );



    const matchedSkills =
    requiredSkills.filter(
        skill =>
        volunteerSkills.includes(skill as any)
    );



    return (

        matchedSkills.length

        /

        requiredSkills.length

    ) * 100;


}








/**
 * Calculate rating score
 */
private calculateRatingScore(
    volunteer:IVolunteer
):number{


    return (

        volunteer.performance.rating

        /

        5

    ) * 100;


}








/**
 * Calculate experience score
 */
private calculateExperienceScore(
    volunteer:IVolunteer
):number{


    const completed =

    volunteer.performance
    .missionsCompleted;



    if(completed >= 100){

        return 100;

    }



    return completed;


}








/**
 * Calculate response score
 *
 * Faster response = better score
 */
private calculateResponseScore(
    volunteer:IVolunteer
):number{


    const responseTime =

    volunteer.performance
    .averageResponseTime;



    if(responseTime <= 10){

        return 100;

    }



    if(responseTime >= 60){

        return 20;

    }



    return (

        (60-responseTime)

        /

        50

    )*100;


}









/**
 * Final AI scoring algorithm
 */
private calculateVolunteerScore(
    volunteer:IVolunteer,
    requiredSkills:string[],
    distance:number
):number{


    const distanceScore =
    this.calculateDistanceScore(
        distance
    );



    const skillScore =
    this.calculateSkillScore(
        volunteer,
        requiredSkills
    );



    const ratingScore =
    this.calculateRatingScore(
        volunteer
    );



    const experienceScore =
    this.calculateExperienceScore(
        volunteer
    );



    const responseScore =
    this.calculateResponseScore(
        volunteer
    );




    return (

        distanceScore * 0.40

        +

        skillScore * 0.25

        +

        ratingScore * 0.20

        +

        experienceScore * 0.10

        +

        responseScore * 0.05

    );


}









/**
 * Rank volunteers for incident
 */
async rankCandidates(
    candidates:IVolunteer[],
    requiredSkills:string[],
    distanceMap:any
){



    const ranked =

    candidates.map(
        volunteer=>{


            const distance =
            distanceMap[
                volunteer._id.toString()
            ] || 0;



            return {

                volunteer,


                score:

                this.calculateVolunteerScore(

                    volunteer,

                    requiredSkills,

                    distance

                )

            };


        }

    );





    return ranked.sort(

        (a,b)=>

        b.score-a.score

    );


}









/**
 * Find best volunteer for incident
 */
async findBestVolunteer(
    longitude:number,
    latitude:number,
    requiredSkills:string[]
){



    const candidates =

    await volunteerRepository
    .findBestCandidates(

        longitude,

        latitude,

        requiredSkills[0]

    );





    if(
        candidates.length===0
    ){

        throw new Error(
            "No suitable volunteer found"
        );

    }





    const ranked =

    await this.rankCandidates(

        candidates,

        requiredSkills,

        {}

    );





    return ranked[0];

}









/**
 * Assign mission to best volunteer
 */
async assignMission(
    missionData:any
){



    const bestCandidate =

    await this.findBestVolunteer(

        missionData.longitude,

        missionData.latitude,

        missionData.requiredSkills

    );





    if(!bestCandidate){

        throw new Error(
            "Unable to assign volunteer"
        );

    }





    return await volunteerRepository
    .assignMission(

        bestCandidate
        .volunteer
        ._id
        .toString(),

        missionData

    );

}
/**
 * Accept assigned mission
 */
async acceptMission(
    volunteerId:string
){


    const volunteer =
    await volunteerRepository
    .findById(volunteerId);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }




    if(
        !volunteer.currentMission
    ){

        throw new Error(
            "No active mission assigned"
        );

    }




    if(

        volunteer.currentMission.status
        !== MissionStatus.ASSIGNED

    ){

        throw new Error(
            "Mission cannot be accepted"
        );

    }




    return await volunteerRepository
    .acceptMission(
        volunteerId
    );

}









/**
 * Reject mission
 */
async rejectMission(
    volunteerId:string
){


    const volunteer =
    await volunteerRepository
    .findById(
        volunteerId
    );



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }





    return await volunteerRepository
    .rejectMission(
        volunteerId
    );

}









/**
 * Start rescue mission
 */
async startMission(
    volunteerId:string
){


    const volunteer =
    await volunteerRepository
    .findById(
        volunteerId
    );



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }





    if(
        !volunteer.currentMission
    ){

        throw new Error(
            "No active mission"
        );

    }





    return await volunteerRepository
    .startMission(
        volunteerId
    );

}









/**
 * Complete mission
 */
async completeMission(
    volunteerId:string,
    rescuedPeople:number
){



    const volunteer =
    await volunteerRepository
    .findById(
        volunteerId
    );



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }





    if(
        !volunteer.currentMission
    ){

        throw new Error(
            "No active mission"
        );

    }





    return await volunteerRepository
    .completeMission(

        volunteerId,

        rescuedPeople

    );

}









/**
 * Get volunteer leaderboard
 */
async getLeaderboard(
    limit:number = 100
){



    return await volunteerRepository
    .getLeaderboard(
        limit
    );

}









/**
 * Get volunteer analytics
 */
async getStatistics()
{


    return await volunteerRepository
    .getStatistics();


}









/**
 * Update volunteer performance
 */
async updatePerformance(
    id:string,
    data:any
){


    const volunteer =
    await volunteerRepository
    .findById(
        id
    );



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }




    return await volunteerRepository
    .updatePerformance(

        id,

        data

    );

}









/**
 * Get volunteer mission history
 */
async getMissionHistory(
    id:string
){


    const volunteer =
    await volunteerRepository
    .findById(id);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }




    return {

        completed:

        volunteer.completedMissions,


        current:

        volunteer.currentMission || null

    };

}









/**
 * Check volunteer workload
 */
async getWorkload(
    id:string
){



    const volunteer =
    await volunteerRepository
    .findById(id);



    if(!volunteer){

        throw new Error(
            "Volunteer not found"
        );

    }



    return {


        activeMission:

        volunteer.currentMission
        ? 1
        : 0,



        completed:

        volunteer.performance
        .missionsCompleted,


        capacity:

        3


    };

}