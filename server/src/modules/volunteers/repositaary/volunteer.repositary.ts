/**
 * ------------------------------------------------------------------
 * File: volunteer.repository.ts
 *
 * Database access layer for Volunteer Module
 *
 * Responsibilities:
 * - MongoDB operations only
 * - No business logic
 * - No validation
 * - No HTTP errors
 * ------------------------------------------------------------------
 */

import { Types } from "mongoose";

import { Volunteer } from "./volunteer.model";

import { IVolunteer } from "./volunteer.interface";


class VolunteerRepository {


    /**
     * Create new volunteer
     */
    async createVolunteer(
        data: Partial<IVolunteer>
    ): Promise<IVolunteer> {

        const volunteer =
            await Volunteer.create(data);

        return volunteer;
    }



    /**
     * Find volunteer by MongoDB ObjectId
     */
    async findById(
        id: string
    ): Promise<IVolunteer | null> {


        if(!Types.ObjectId.isValid(id)){
            return null;
        }


        return await Volunteer
            .findById(id)
            .populate(
                "user",
                "name email phone"
            )
            .populate(
                "currentMission.incident"
            );
    }





    /**
     * Find volunteer using user id
     */
    async findByUserId(
        userId:string
    ):Promise<IVolunteer | null>{


        if(!Types.ObjectId.isValid(userId)){
            return null;
        }


        return await Volunteer
            .findOne({
                user:userId,
                isActive:true
            })
            .populate(
                "user",
                "name email phone"
            );

    }





    /**
     * Find volunteer by custom volunteer id
     *
     * Example:
     * VOL-2026-00001
     */
    async findByVolunteerId(
        volunteerId:string
    ):Promise<IVolunteer|null>{


        return await Volunteer
            .findOne({
                volunteerId,
                isActive:true
            });

    }






    /**
     * Update volunteer profile
     */
    async updateVolunteer(
        id:string,
        data:Partial<IVolunteer>
    ):Promise<IVolunteer|null>{



        if(!Types.ObjectId.isValid(id)){
            return null;
        }



        return await Volunteer
            .findByIdAndUpdate(
                id,
                {
                    $set:data
                },
                {
                    new:true,
                    runValidators:true
                }
            );

    }







    /**
     * Soft delete volunteer
     *
     * We never delete data permanently.
     */
    async softDelete(
        id:string
    ):Promise<IVolunteer|null>{



        if(!Types.ObjectId.isValid(id)){
            return null;
        }




        return await Volunteer
            .findByIdAndUpdate(
                id,
                {
                    $set:{
                        isActive:false,
                        status:"OFFLINE"
                    }
                },
                {
                    new:true
                }
            );


    }



}



export default new VolunteerRepository();
/**
 * Update volunteer live location
 *
 * Used by:
 * - Mobile app GPS tracking
 * - Real-time rescue tracking
 */
async updateLocation(
    id: string,
    longitude: number,
    latitude: number,
    address?: string
): Promise<IVolunteer | null> {


    if(!Types.ObjectId.isValid(id)){
        return null;
    }


    return await Volunteer.findByIdAndUpdate(
        id,
        {
            $set:{
                location:{
                    type:"Point",
                    coordinates:[
                        longitude,
                        latitude
                    ],
                    address
                },

                lastLocationUpdate:new Date()
            }
        },
        {
            new:true,
            runValidators:true
        }
    );

}






/**
 * Update volunteer availability status
 */
async updateStatus(
    id:string,
    status:string
):Promise<IVolunteer|null>{


    if(!Types.ObjectId.isValid(id)){
        return null;
    }


    return await Volunteer.findByIdAndUpdate(
        id,
        {
            $set:{
                status
            }
        },
        {
            new:true
        }
    );

}







/**
 * Find volunteers near incident location
 *
 * Uses MongoDB 2dsphere index
 *
 * radius in meters
 *
 * Example:
 * 10000 = 10 KM
 */
async findNearby(
    longitude:number,
    latitude:number,
    radius:number = 10000
):Promise<IVolunteer[]>{



    return await Volunteer.find({

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


        status:"AVAILABLE",

        isActive:true,

        isVerified:true

    })
    .limit(100);

}







/**
 * Find volunteers by skill
 *
 * Example:
 * FIRST_AID
 * SEARCH_RESCUE
 */
async findBySkill(
    skill:string
):Promise<IVolunteer[]>{



    return await Volunteer.find({

        "skills.name":skill,

        isActive:true,

        isVerified:true

    })
    .sort({

        "performance.rating":-1

    });

}







/**
 * Find currently available volunteers
 */
async findAvailable(
    limit:number = 50
):Promise<IVolunteer[]>{



    return await Volunteer.find({

        status:"AVAILABLE",

        isActive:true,

        isVerified:true

    })
    .sort({

        "performance.rating":-1,

        "performance.responseTime":1

    })
    .limit(limit);


}








/**
 * Get all volunteers with pagination
 */
async findAll(
    page:number = 1,
    limit:number = 20,
    filter:any = {}
){




    const skip =
        (page-1)*limit;



    const query = {

        ...filter,

        isActive:true

    };



    const [

        volunteers,

        total

    ] = await Promise.all([


        Volunteer.find(query)

        .skip(skip)

        .limit(limit)

        .sort({
            createdAt:-1
        }),


        Volunteer.countDocuments(query)

    ]);



    return {

        data:volunteers,

        pagination:{

            total,

            page,

            limit,

            pages:
            Math.ceil(total/limit)

        }

    };

}









/**
 * Search volunteers
 *
 * Searches:
 * - name
 * - city
 * - skills
 * - volunteerId
 */
async search(
    keyword:string
):Promise<IVolunteer[]>{



    return await Volunteer.find({

        $or:[


            {
                volunteerId:{
                    $regex:keyword,
                    $options:"i"
                }
            },


            {
                "location.city":{
                    $regex:keyword,
                    $options:"i"
                }
            },


            {
                "skills.name":{
                    $regex:keyword,
                    $options:"i"
                }
            }


        ],


        isActive:true


    })
    .limit(50);


}
/**
 * Assign mission to volunteer
 *
 * Flow:
 * Incident
 *    |
 *    |
 * Assigned Volunteer
 */
async assignMission(
    volunteerId: string,
    missionData: any
): Promise<IVolunteer | null> {


    if(!Types.ObjectId.isValid(volunteerId)){
        return null;
    }


    return await Volunteer.findByIdAndUpdate(

        volunteerId,

        {
            $set:{

                currentMission:{

                    incident:
                    missionData.incident,

                    priority:
                    missionData.priority,

                    status:
                    "ASSIGNED",

                    assignedAt:
                    new Date()

                },


                status:
                "ON_MISSION"

            }

        },

        {
            new:true,
            runValidators:true
        }

    );

}







/**
 * Volunteer accepts mission
 */
async acceptMission(
    volunteerId:string
):Promise<IVolunteer|null>{



    return await Volunteer.findOneAndUpdate(

        {
            _id:volunteerId,

            "currentMission.status":
            "ASSIGNED"

        },


        {

            $set:{

                "currentMission.status":
                "ACCEPTED",

                "currentMission.acceptedAt":
                new Date()

            }

        },


        {
            new:true
        }

    );

}







/**
 * Volunteer rejects mission
 */
async rejectMission(
    volunteerId:string
):Promise<IVolunteer|null>{



    return await Volunteer.findOneAndUpdate(

        {
            _id:volunteerId
        },


        {

            $set:{


                "currentMission.status":
                "REJECTED",


                status:
                "AVAILABLE"


            }


        },


        {
            new:true
        }

    );

}







/**
 * Start mission
 *
 * Volunteer starts moving
 */
async startMission(
    volunteerId:string
):Promise<IVolunteer|null>{



    return await Volunteer.findOneAndUpdate(

        {

            _id:volunteerId,

            "currentMission.status":
            {
                $in:[
                    "ACCEPTED",
                    "EN_ROUTE"
                ]
            }

        },


        {

            $set:{


                "currentMission.status":
                "WORKING",


                "currentMission.startedAt":
                new Date()


            }

        },


        {
            new:true
        }

    );

}








/**
 * Complete mission
 *
 * Moves current mission into history
 */
async completeMission(
    volunteerId:string,
    rescuedPeople:number = 0
):Promise<IVolunteer|null>{



    const volunteer =
    await Volunteer.findById(
        volunteerId
    );


    if(!volunteer){
        return null;
    }



    const mission =
    volunteer.currentMission;



    if(!mission){
        return null;
    }



    mission.status =
    "COMPLETED";



    mission.completedAt =
    new Date();




    return await Volunteer.findByIdAndUpdate(

        volunteerId,


        {


            $push:{


                completedMissions:
                mission.incident


            },


            $set:{


                currentMission:null,


                status:
                "AVAILABLE"


            },


            $inc:{


                "performance.missionsCompleted":
                1,


                "performance.rescuedPeople":
                rescuedPeople


            }


        },


        {
            new:true
        }

    );

}









/**
 * Bulk update volunteer status
 *
 * Used during:
 *
 * - Disaster declaration
 * - Emergency shutdown
 * - Mass deployment
 */
async bulkUpdateStatus(
    ids:string[],
    status:string
){



    return await Volunteer.updateMany(

        {
            _id:{
                $in:ids
            }
        },


        {

            $set:{
                status
            }

        }

    );

}
/**
 * Get volunteer leaderboard
 *
 * Ranking based on:
 * - completed missions
 * - rating
 * - response time
 */
async getLeaderboard(
    limit:number = 100
):Promise<IVolunteer[]> {


    return await Volunteer.find({

        isActive:true,

        isVerified:true

    })

    .sort({

        "performance.rating":-1,

        "performance.missionsCompleted":-1,

        "performance.averageResponseTime":1

    })

    .limit(limit);

}








/**
 * Volunteer statistics
 *
 * Used by:
 * - Admin dashboard
 * - Analytics service
 */
async getStatistics(){



    const result =
    await Volunteer.aggregate([

        {

            $facet:{


                total:[

                    {
                        $count:"count"
                    }

                ],



                available:[

                    {
                        $match:{
                            status:"AVAILABLE"
                        }
                    },


                    {
                        $count:"count"
                    }

                ],



                activeMission:[

                    {
                        $match:{
                            status:"ON_MISSION"
                        }
                    },


                    {
                        $count:"count"
                    }

                ],



                verified:[

                    {
                        $match:{
                            isVerified:true
                        }
                    },


                    {
                        $count:"count"
                    }

                ]

            }

        }

    ]);



    return result[0];

}









/**
 * Count volunteers near location
 */
async countNearby(
    longitude:number,
    latitude:number,
    radius:number = 10000
):Promise<number>{



    return await Volunteer.countDocuments({

        location:{

            $near:{

                $geometry:{

                    type:"Point",

                    coordinates:[
                        longitude,
                        latitude
                    ]

                },

                $maxDistance:
                radius

            }

        },


        status:
        "AVAILABLE",


        isActive:true


    });


}









/**
 * Find best volunteer candidates
 *
 * Used by AI assignment engine.
 *
 * Ranking factors:
 *
 * 1. Distance
 * 2. Skill match
 * 3. Rating
 * 4. Experience
 * 5. Availability
 */
async findBestCandidates(

    longitude:number,

    latitude:number,

    skill?:string,

    radius:number = 20000

):Promise<IVolunteer[]> {



    const query:any = {


        location:{


            $near:{


                $geometry:{


                    type:"Point",


                    coordinates:[

                        longitude,

                        latitude

                    ]

                },


                $maxDistance:
                radius


            }

        },


        status:
        "AVAILABLE",


        isActive:true,


        isVerified:true

    };




    if(skill){


        query.skills = {

            $elemMatch:{

                name:skill

            }

        };


    }






    return await Volunteer.find(query)

    .sort({

        "performance.rating":
        -1,


        "performance.missionsCompleted":
        -1,


        "performance.averageResponseTime":
        1


    })

    .limit(20);



}








/**
 * Count volunteers by skill
 */
async countBySkill(
    skill:string
){


    return await Volunteer.countDocuments({

        skills:{

            $elemMatch:{

                name:skill

            }

        },


        isActive:true

    });


}









/**
 * Update volunteer performance
 */
async updatePerformance(

    id:string,

    data:any

):Promise<IVolunteer|null>{



    return await Volunteer.findByIdAndUpdate(

        id,


        {

            $set:{


                performance:data


            }

        },


        {

            new:true

        }

    );

}
