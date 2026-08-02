/**
 * ----------------------------------------------------------
 * Update Shelter Capacity
 * PATCH /shelters/:id/capacity
 * ----------------------------------------------------------
 */
async updateCapacity(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateCapacity(

            req.params.id,

            req.body.currentOccupancy

        );

        res.status(200).json({

            success: true,

            message:
            "Shelter capacity updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Admit Evacuees
 * POST /shelters/:id/admit
 * ----------------------------------------------------------
 */
async admitEvacuees(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.admitEvacuees(

            req.params.id,

            req.body.people

        );

        res.status(200).json({

            success: true,

            message:
            "Evacuees admitted successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Release Evacuees
 * POST /shelters/:id/release
 * ----------------------------------------------------------
 */
async releaseEvacuees(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.releaseEvacuees(

            req.params.id,

            req.body.people

        );

        res.status(200).json({

            success: true,

            message:
            "Evacuees released successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Replace Resource Inventory
 * PATCH /shelters/:id/resources
 * ----------------------------------------------------------
 */
async updateResources(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateResources(

            req.params.id,

            req.body.resources

        );

        res.status(200).json({

            success: true,

            message:
            "Resources updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Add Single Resource
 * POST /shelters/:id/resources
 * ----------------------------------------------------------
 */
async addResource(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.addResource(

            req.params.id,

            req.body

        );

        res.status(200).json({

            success: true,

            message:
            "Resource added successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Update Facilities
 * PATCH /shelters/:id/facilities
 * ----------------------------------------------------------
 */
async updateFacilities(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateFacilities(

            req.params.id,

            req.body.facilities

        );

        res.status(200).json({

            success: true,

            message:
            "Facilities updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Update Shelter Staff
 * PATCH /shelters/:id/staff
 * ----------------------------------------------------------
 */
async updateStaff(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const shelter =

        await shelterService.updateStaff(

            req.params.id,

            req.body.staff

        );

        res.status(200).json({

            success: true,

            message:
            "Staff updated successfully",

            data: shelter

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Shelter Analytics
 * GET /shelters/analytics
 * ----------------------------------------------------------
 */
async getStatistics(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const analytics =

        await shelterService.getShelterStatistics();

        res.status(200).json({

            success: true,

            data: analytics

        });

    }

    catch (error) {

        next(error);

    }

}









/**
 * ----------------------------------------------------------
 * Shelter Leaderboard
 * GET /shelters/leaderboard
 * ----------------------------------------------------------
 */
async getLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const limit =

            Number(req.query.limit) || 10;

        const shelters =

        await shelterService.getTopShelters(
            limit
        );

        res.status(200).json({

            success: true,

            count: shelters.length,

            data: shelters

        });

    }

    catch (error) {

        next(error);

    }

}
/**
 * ------------------------------------------------------------------
 * Update Shelter
 * ------------------------------------------------------------------
 */
export const updateShelterSchema =

z.object({

    name:
    z.string()
    .min(3)
    .optional(),

    status:
    z.nativeEnum(
        ShelterStatus
    )
    .optional(),

    verificationStatus:
    z.nativeEnum(
        ShelterVerificationStatus
    )
    .optional(),

    contact:
    contactSchema
    .partial()
    .optional(),

    acceptsPets:
    z.boolean()
    .optional(),

    acceptsSpecialNeeds:
    z.boolean()
    .optional(),

    isActive:
    z.boolean()
    .optional()

});









/**
 * ------------------------------------------------------------------
 * Update Capacity
 * ------------------------------------------------------------------
 */
export const updateCapacitySchema =

z.object({

    currentOccupancy:

    z.number()
    .min(0)

});









/**
 * ------------------------------------------------------------------
 * Admit Evacuees
 * ------------------------------------------------------------------
 */
export const admitEvacueesSchema =

z.object({

    people:

    z.number()

    .int()

    .positive()

});









/**
 * ------------------------------------------------------------------
 * Release Evacuees
 * ------------------------------------------------------------------
 */
export const releaseEvacueesSchema =

z.object({

    people:

    z.number()

    .int()

    .positive()

});









/**
 * ------------------------------------------------------------------
 * Replace Resource Inventory
 * ------------------------------------------------------------------
 */
export const updateResourcesSchema =

z.object({

    resources:

    z.array(

        resourceSchema

    )

});









/**
 * ------------------------------------------------------------------
 * Add Resource
 * ------------------------------------------------------------------
 */
export const addResourceSchema =

resourceSchema;









/**
 * ------------------------------------------------------------------
 * Update Facilities
 * ------------------------------------------------------------------
 */
export const updateFacilitiesSchema =

z.object({

    facilities:

    z.array(

        facilitySchema

    )

});









/**
 * ------------------------------------------------------------------
 * Update Staff
 * ------------------------------------------------------------------
 */
export const updateStaffSchema =

z.object({

    staff:

    z.array(

        staffSchema

    )

});









/**
 * ------------------------------------------------------------------
 * Nearby Shelter Search
 * ------------------------------------------------------------------
 */
export const nearbyShelterSchema =

z.object({

    longitude:

    z.coerce
    .number()
    .min(-180)
    .max(180),

    latitude:

    z.coerce
    .number()
    .min(-90)
    .max(90),

    radius:

    z.coerce
    .number()
    .positive()
    .optional()

});









/**
 * ------------------------------------------------------------------
 * AI Shelter Recommendation
 * ------------------------------------------------------------------
 */
export const recommendShelterSchema =

z.object({

    longitude:

    z.coerce
    .number(),

    latitude:

    z.coerce
    .number(),

    people:

    z.coerce
    .number()
    .int()
    .positive()

});









/**
 * ------------------------------------------------------------------
 * Export Validators
 * ------------------------------------------------------------------
 */
export const shelterValidators = {

    createShelterSchema,

    updateShelterSchema,

    updateCapacitySchema,

    admitEvacueesSchema,

    releaseEvacueesSchema,

    updateResourcesSchema,

    addResourceSchema,

    updateFacilitiesSchema,

    updateStaffSchema,

    nearbyShelterSchema,

    recommendShelterSchema

};