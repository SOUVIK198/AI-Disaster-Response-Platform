/**
 * ------------------------------------------------------------------
 * File: ngo.service.ts
 *
 * Business Logic Layer
 * ------------------------------------------------------------------
 */

import ngoRepository from "./ngo.repository";

import { INGO } from "./ngo.interface";

class NGOService {

    /**
     * ----------------------------------------------------------
     * Register NGO
     * ----------------------------------------------------------
     */
    async createNGO(
        data: Partial<INGO>
    ) {

        const existing =

            await ngoRepository.findByCode(
                data.ngoCode!
            );

        if (existing) {

            throw new Error(
                "NGO code already exists"
            );

        }

        return ngoRepository.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Get NGO
     * ----------------------------------------------------------
     */
    async getNGOById(
        ngoId: string
    ) {

        const ngo =

            await ngoRepository.findById(
                ngoId
            );

        if (!ngo) {

            throw new Error(
                "NGO not found"
            );

        }

        return ngo;

    }










    /**
     * ----------------------------------------------------------
     * Get All NGOs
     * ----------------------------------------------------------
     */
    async getNGOs(
        limit: number = 50
    ) {

        return ngoRepository.findAll(limit);

    }










    /**
     * ----------------------------------------------------------
     * Update NGO
     * ----------------------------------------------------------
     */
    async updateNGO(
        ngoId: string,
        data: Partial<INGO>
    ) {

        const ngo =

            await ngoRepository.update(
                ngoId,
                data
            );

        if (!ngo) {

            throw new Error(
                "NGO not found"
            );

        }

        return ngo;

    }










    /**
     * ----------------------------------------------------------
     * Delete NGO
     * ----------------------------------------------------------
     */
    async deleteNGO(
        ngoId: string
    ) {

        const ngo =

            await ngoRepository.delete(
                ngoId
            );

        if (!ngo) {

            throw new Error(
                "NGO not found"
            );

        }

        return ngo;

    }










    /**
     * ----------------------------------------------------------
     * Nearby NGOs
     * ----------------------------------------------------------
     */
    async getNearbyNGOs(

        longitude: number,

        latitude: number,

        radius: number = 10000

    ) {

        return ngoRepository.findNearby(

            longitude,

            latitude,

            radius

        );

    }










    /**
     * ----------------------------------------------------------
     * Verify NGO
     * ----------------------------------------------------------
     */
    async verifyNGO(
        ngoId: string
    ) {

        const ngo =

            await ngoRepository.verifyNGO(
                ngoId
            );

        if (!ngo) {

            throw new Error(
                "NGO not found"
            );

        }

        return ngo;

    }

}

export default new NGOService();
/**
 * ----------------------------------------------------------
 * Update Inventory
 * ----------------------------------------------------------
 */
async updateInventory(
    ngoId: string,
    inventory: any[]
) {

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.updateInventory(

        ngoId,

        inventory

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

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.addInventoryItem(

        ngoId,

        item

    );

}










/**
 * ----------------------------------------------------------
 * Update Vehicles
 * ----------------------------------------------------------
 */
async updateVehicles(
    ngoId: string,
    vehicles: any[]
) {

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.updateVehicles(

        ngoId,

        vehicles

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

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.addVehicle(

        ngoId,

        vehicle

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

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.assignIncident(

        ngoId,

        assignment

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

    const ngo =

    await ngoRepository.completeAssignment(

        ngoId,

        assignmentId

    );

    if (!ngo) {

        throw new Error(
            "Assignment not found"
        );

    }

    return ngo;

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

    const ngo =

    await ngoRepository.findById(
        ngoId
    );

    if (!ngo) {

        throw new Error(
            "NGO not found"
        );

    }

    return ngoRepository.addDonation(

        ngoId,

        donation

    );

}










/**
 * ----------------------------------------------------------
 * NGO Statistics
 * ----------------------------------------------------------
 */
async getStatistics() {

    return ngoRepository.getStatistics();

}










/**
 * ----------------------------------------------------------
 * Top NGOs
 * ----------------------------------------------------------
 */
async getTopNGOs(
    limit: number = 10
) {

    return ngoRepository.getTopNGOs(
        limit
    );

}










/**
 * ----------------------------------------------------------
 * AI NGO Recommendation
 * ----------------------------------------------------------
 */
async recommendNGO(

    longitude: number,

    latitude: number,

    priority: string

) {

    const ngos =

    await ngoRepository.findNearby(

        longitude,

        latitude,

        50000

    );

    if (ngos.length === 0) {

        throw new Error(
            "No NGOs found nearby"
        );

    }

    const ranked = ngos
        .filter(

            ngo =>

                ngo.verificationStatus === "VERIFIED"

        )
        .sort(

            (a, b) => {

                let scoreA = 0;
                let scoreB = 0;

                scoreA +=
                    a.activeVolunteers * 2;

                scoreB +=
                    b.activeVolunteers * 2;

                scoreA +=
                    a.vehicles.length * 5;

                scoreB +=
                    b.vehicles.length * 5;

                scoreA +=
                    a.inventory.length;

                scoreB +=
                    b.inventory.length;

                if (priority === "CRITICAL") {

                    scoreA += 20;

                    scoreB += 20;

                }

                return scoreB - scoreA;

            }

        );

    if (ranked.length === 0) {

        throw new Error(
            "No verified NGO available"
        );

    }

    return ranked[0];

}