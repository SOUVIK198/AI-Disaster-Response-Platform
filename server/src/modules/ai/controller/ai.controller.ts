/**
 * ------------------------------------------------------------------
 * File: ai.controller.ts
 * ------------------------------------------------------------------
 */

import {

    Request,

    Response,

    NextFunction

} from "express";

import aiService from "./ai.service";

import {

    AIProvider

} from "./ai.types";

class AIController {

    /**
     * ----------------------------------------------------------
     * Chat Completion
     * POST /ai/chat
     * ----------------------------------------------------------
     */
    async chat(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const result =

            await aiService.chat(

                req.body

            );

            res.status(200).json({

                success: true,

                data: result

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Disaster Prediction
     * POST /ai/predict
     * ----------------------------------------------------------
     */
    async predict(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const prediction =

            await aiService.predict(

                req.body.input

            );

            res.status(200).json({

                success: true,

                data: prediction

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Summarize Incident
     * POST /ai/summarize
     * ----------------------------------------------------------
     */
    async summarize(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const summary =

            await aiService.summarize(

                req.body.text

            );

            res.status(200).json({

                success: true,

                data: summary

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * General Recommendation
     * GET /ai/recommendations
     * ----------------------------------------------------------
     */
    async recommendations(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const recommendations =

            await aiService.recommend();

            res.status(200).json({

                success: true,

                data: recommendations

            });

        }

        catch (error) {

            next(error);

        }

    }










    /**
     * ----------------------------------------------------------
     * Generate Embeddings
     * POST /ai/embeddings
     * ----------------------------------------------------------
     */
    async embeddings(

        req: Request,

        res: Response,

        next: NextFunction

    ) {

        try {

            const embedding =

            await aiService.generateEmbeddings(

                req.body.text,

                req.body.provider as AIProvider

            );

            res.status(200).json({

                success: true,

                data: embedding

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new AIController();

/**
 * ----------------------------------------------------------
 * Provider Health Check
 * GET /ai/providers/health
 * ----------------------------------------------------------
 */
async health(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const health =

        await aiService.healthCheck();

        res.status(200).json({

            success: true,

            data: health

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Select AI Provider
 * GET /ai/providers/select/:provider
 * ----------------------------------------------------------
 */
async selectProvider(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const provider =

        aiService.selectProvider(

            req.params.provider as AIProvider

        );

        res.status(200).json({

            success: true,

            provider

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Resource Recommendation
 * GET /ai/recommendations/resources
 * ----------------------------------------------------------
 */
async resourceRecommendations(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const resources =

        await aiService.recommendResources();

        res.status(200).json({

            success: true,

            data: resources

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Volunteer Recommendation
 * GET /ai/recommendations/volunteers
 * ----------------------------------------------------------
 */
async volunteerRecommendations(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const volunteers =

        await aiService.recommendVolunteers();

        res.status(200).json({

            success: true,

            data: volunteers

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Hospital Recommendation
 * GET /ai/recommendations/hospitals
 * ----------------------------------------------------------
 */
async hospitalRecommendations(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const hospitals =

        await aiService.recommendHospitals();

        res.status(200).json({

            success: true,

            data: hospitals

        });

    }

    catch (error) {

        next(error);

    }

}










/**
 * ----------------------------------------------------------
 * Shelter Recommendation
 * GET /ai/recommendations/shelters
 * ----------------------------------------------------------
 */
async shelterRecommendations(

    req: Request,

    res: Response,

    next: NextFunction

) {

    try {

        const shelters =

        await aiService.recommendShelters();

        res.status(200).json({

            success: true,

            data: shelters

        });

    }

    catch (error) {

        next(error);

    }

}