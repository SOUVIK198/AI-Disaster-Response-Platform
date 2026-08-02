/**
 * ------------------------------------------------------------------
 * File: shelter.repository.ts
 *
 * Database Access Layer
 *
 * ------------------------------------------------------------------
 */

import {
    Shelter,
    IShelterDocument
} from "./shelter.model";

import {
    IShelter
} from "./shelter.interface";

class ShelterRepository {

    /**
     * Create Shelter
     */
    async create(
        data: Partial<IShelter>
    ): Promise<IShelterDocument> {

        return Shelter.create(data);

    }










    /**
     * Find Shelter By ID
     */
    async findById(
        id: string
    ) {

        return Shelter.findById(id);

    }










    /**
     * Find Shelter By Code
     */
    async findByCode(
        shelterCode: string
    ) {

        return Shelter.findOne({

            shelterCode

        });

    }










    /**
     * Get All Active Shelters
     */
    async findAll(
        limit: number = 50
    ) {

        return Shelter.find({

            isActive: true

        })

        .limit(limit);

    }










    /**
     * Update Shelter
     */
    async update(
        id: string,
        data: Partial<IShelter>
    ) {

        return Shelter.findByIdAndUpdate(

            id,

            data,

            {

                new: true

            }

        );

    }










    /**
     * Soft Delete Shelter
     */
    async delete(
        id: string
    ) {

        return Shelter.findByIdAndUpdate(

            id,

            {

                isActive: false

            },

            {

                new: true

            }

        );

    }










    /**
     * Find Nearby Shelters
     */
    async findNearby(

        longitude: number,

        latitude: number,

        radius: number = 10000

    ) {

        return Shelter.find({

            isActive: true,

            status: "ACTIVE",

            location: {

                $near: {

                    $geometry: {

                        type: "Point",

                        coordinates: [

                            longitude,

                            latitude

                        ]

                    },

                    $maxDistance: radius

                }

            }

        });

    }










    /**
     * Find Available Shelters
     */
    async findAvailable() {

        return Shelter.find({

            isActive: true,

            status: "ACTIVE",

            "capacity.availableCapacity": {

                $gt: 0

            }

        });

    }

}

export default new ShelterRepository();
/**
 * ----------------------------------------------------------
 * Update Shelter Capacity
 * ----------------------------------------------------------
 */
async updateCapacity(
    shelterId: string,
    currentOccupancy: number
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            $set: {

                "capacity.currentOccupancy":
                currentOccupancy

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Admit Evacuees
 * ----------------------------------------------------------
 */
async admitEvacuees(
    shelterId: string,
    people: number
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            $inc: {

                "capacity.currentOccupancy":
                people,

                "capacity.availableCapacity":
                -people

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Release Evacuees
 * ----------------------------------------------------------
 */
async releaseEvacuees(
    shelterId: string,
    people: number
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            $inc: {

                "capacity.currentOccupancy":
                -people,

                "capacity.availableCapacity":
                people

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Replace Resource Inventory
 * ----------------------------------------------------------
 */
async updateResources(
    shelterId: string,
    resources: any[]
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            resources

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Add Resource
 * ----------------------------------------------------------
 */
async addResource(
    shelterId: string,
    resource: any
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            $push: {

                resources: resource

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Update Facilities
 * ----------------------------------------------------------
 */
async updateFacilities(
    shelterId: string,
    facilities: any[]
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            facilities

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Update Shelter Staff
 * ----------------------------------------------------------
 */
async updateStaff(
    shelterId: string,
    staff: any[]
) {

    return Shelter.findByIdAndUpdate(

        shelterId,

        {

            staff

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Shelter Statistics
 * ----------------------------------------------------------
 */
async getStatistics() {

    return Shelter.aggregate([

        {

            $match: {

                isActive: true

            }

        },

        {

            $group: {

                _id: null,

                totalShelters: {

                    $sum: 1

                },

                totalCapacity: {

                    $sum:
                    "$capacity.totalCapacity"

                },

                currentOccupancy: {

                    $sum:
                    "$capacity.currentOccupancy"

                },

                availableCapacity: {

                    $sum:
                    "$capacity.availableCapacity"

                }

            }

        }

    ]);

}









/**
 * ----------------------------------------------------------
 * Top Shelters By Free Capacity
 * ----------------------------------------------------------
 */
async getShelterLeaderboard(
    limit: number = 10
) {

    return Shelter.find({

        isActive: true

    })

    .sort({

        "capacity.availableCapacity": -1

    })

    .limit(limit);

}