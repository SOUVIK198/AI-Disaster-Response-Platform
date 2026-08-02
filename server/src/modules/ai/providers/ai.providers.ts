/**
 * ------------------------------------------------------------------
 * File: providers/ai.provider.ts
 * ------------------------------------------------------------------
 */

import {

    IChatRequest,
    IChatResponse,
    IEmbeddingResult,
    IAISummary,
    IPrediction,
    IRecommendation

} from "../ai.interface";

export interface IAIProvider {

    /**
     * Chat Completion
     */
    chat(
        request: IChatRequest
    ): Promise<IChatResponse>;

    /**
     * Generate Embeddings
     */
    embeddings(
        text: string
    ): Promise<IEmbeddingResult>;

    /**
     * Predict Disaster
     */
    predict(
        input: string
    ): Promise<IPrediction>;

    /**
     * Summarize Incident
     */
    summarize(
        text: string
    ): Promise<IAISummary>;

    /**
     * Generate Recommendations
     */
    recommend(
        input: string
    ): Promise<IRecommendation[]>;

    /**
     * Health Check
     */
    health(): Promise<boolean>;

}