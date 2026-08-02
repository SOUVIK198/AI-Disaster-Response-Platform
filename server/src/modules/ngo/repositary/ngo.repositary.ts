/**
 * ------------------------------------------------------------------
 * File: ngo.repository.ts
 *
 * Database Access Layer
 * ------------------------------------------------------------------
 */

import {

    NGO,

    INGODocument

} from "./ngo.model";

import {

    INGO

} from "./ngo.interface";

class NGORepository {

    /**
     * ----------------------------------------------------------
     * Create NGO
     * ----------------------------------------------------------
     */
    async create(
        data: Partial<INGO>
    ): Promise<INGODocument> {

        return NGO.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Find NGO By ID
     * ----------------------------------------------------------
     */
    async findById(
        id: string
    ) {

        return NGO.findById(id);

    }










    /**
     * ----------------------------------------------------------
     * Find NGO By Code
     * ----------------------------------------------------------
     */
    async findByCode(
        ngoCode: string
    ) {

        return NGO.findOne({

            ngoCode

        });

    }










    /**
     * ----------------------------------------------------------
     * Get All NGOs
     * ----------------------------------------------------------
     */
    async findAll(
        limit: number = 50
    ) {

        return NGO.find({

            isActive: true

        })

        .limit(limit);

    }










    /**
     * ----------------------------------------------------------
     * Update NGO
     * ----------------------------------------------------------
     */
    async update(

        id: string,

        data: Partial<INGO>

    ) {

        return NGO.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Soft Delete NGO
     * ----------------------------------------------------------
     */
    async delete(
        id: string
    ) {

        return NGO.findByIdAndUpdate(

            id,

            {

                isActive: false,

                status: "INACTIVE"

            },

            {

                new: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Find Nearby NGOs
     * ----------------------------------------------------------
     */
    async findNearby(

        longitude: number,

        latitude: number,

        radius: number = 10000

    ) {

        return NGO.find({

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
     * ----------------------------------------------------------
     * Verified NGOs
     * ----------------------------------------------------------
     */
    async findVerified() {

        return NGO.find({

            verificationStatus:

            "VERIFIED",

            isActive: true

        });

    }

}

export default new NGORepository();
/**
 * ----------------------------------------------------------
 * Verify NGO
 * ----------------------------------------------------------
 */
async verifyNGO(
    ngoId: string
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            verificationStatus: "VERIFIED"

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Replace Inventory
 * ----------------------------------------------------------
 */
async updateInventory(
    ngoId: string,
    inventory: any[]
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            inventory

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Add Inventory Item
 * ----------------------------------------------------------
 */
async addInventoryItem(
    ngoId: string,
    item: any
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            $push: {

                inventory: item

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Replace Vehicle List
 * ----------------------------------------------------------
 */
async updateVehicles(
    ngoId: string,
    vehicles: any[]
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            vehicles

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Add Vehicle
 * ----------------------------------------------------------
 */
async addVehicle(
    ngoId: string,
    vehicle: any
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            $push: {

                vehicles: vehicle

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Assign Disaster
 * ----------------------------------------------------------
 */
async assignIncident(
    ngoId: string,
    assignment: any
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            $push: {

                assignments: assignment

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Complete Assignment
 * ----------------------------------------------------------
 */
async completeAssignment(
    ngoId: string,
    assignmentId: string
) {

    return NGO.findOneAndUpdate(

        {

            _id: ngoId,

            "assignments._id":
            assignmentId

        },

        {

            $set: {

                "assignments.$.status":
                "COMPLETED",

                "assignments.$.completedAt":
                new Date()

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * Add Donation
 * ----------------------------------------------------------
 */
async addDonation(
    ngoId: string,
    donation: any
) {

    return NGO.findByIdAndUpdate(

        ngoId,

        {

            $push: {

                donations: donation

            }

        },

        {

            new: true

        }

    );

}









/**
 * ----------------------------------------------------------
 * NGO Statistics
 * ----------------------------------------------------------
 */
async getStatistics() {

    return NGO.aggregate([

        {

            $match: {

                isActive: true

            }

        },

        {

            $group: {

                _id: null,

                totalNGOs: {

                    $sum: 1

                },

                verifiedNGOs: {

                    $sum: {

                        $cond: [

                            {

                                $eq: [

                                    "$verificationStatus",

                                    "VERIFIED"

                                ]

                            },

                            1,

                            0

                        ]

                    }

                },

                totalVolunteers: {

                    $sum:

                    "$totalVolunteers"

                },

                activeVolunteers: {

                    $sum:

                    "$activeVolunteers"

                }

            }

        }

    ]);

}









/**
 * ----------------------------------------------------------
 * Top NGOs
 * ----------------------------------------------------------
 */
async getTopNGOs(
    limit: number = 10
) {

    return NGO.find({

        isActive: true,

        verificationStatus:
        "VERIFIED"

    })

    .sort({

        activeVolunteers: -1

    })

    .limit(limit);

}