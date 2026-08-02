/**
 * ------------------------------------------------------------------
 * File: ai.interface.ts
 * ------------------------------------------------------------------
 */

import {

    AIProvider,

    AITask,

    Severity,

    RecommendationType,

    PredictionStatus,

    ChatRole,

    ModelType

} from "./ai.types";










/**
 * ----------------------------------------------------------
 * LLM Message
 * ----------------------------------------------------------
 */
export interface ILLMMessage {

    role: ChatRole;

    content: string;

}










/**
 * ----------------------------------------------------------
 * Chat Request
 * ----------------------------------------------------------
 */
export interface IChatRequest {

    provider: AIProvider;

    model: string;

    messages: ILLMMessage[];

    temperature?: number;

    maxTokens?: number;

}










/**
 * ----------------------------------------------------------
 * Chat Response
 * ----------------------------------------------------------
 */
export interface IChatResponse {

    provider: AIProvider;

    model: string;

    response: string;

    usage?: {

        promptTokens: number;

        completionTokens: number;

        totalTokens: number;

    };

}










/**
 * ----------------------------------------------------------
 * Prediction Result
 * ----------------------------------------------------------
 */
export interface IPrediction {

    task: AITask;

    severity: Severity;

    confidence: number;

    prediction: string;

    status: PredictionStatus;

}










/**
 * ----------------------------------------------------------
 * Recommendation
 * ----------------------------------------------------------
 */
export interface IRecommendation {

    type: RecommendationType;

    title: string;

    description: string;

    confidence: number;

}










/**
 * ----------------------------------------------------------
 * Embedding Result
 * ----------------------------------------------------------
 */
export interface IEmbeddingResult {

    provider: AIProvider;

    model: string;

    dimensions: number;

    embedding: number[];

}










/**
 * ----------------------------------------------------------
 * AI Summary
 * ----------------------------------------------------------
 */
export interface IAISummary {

    title: string;

    summary: string;

    generatedAt: Date;

}










/**
 * ----------------------------------------------------------
 * AI Request
 * ----------------------------------------------------------
 */
export interface IAIRequest {

    provider: AIProvider;

    task: AITask;

    modelType: ModelType;

    input: string;

}










/**
 * ----------------------------------------------------------
 * AI Response
 * ----------------------------------------------------------
 */
export interface IAIResponse {

    success: boolean;

    provider: AIProvider;

    task: AITask;

    result:

        | IChatResponse
        | IPrediction
        | IRecommendation[]
        | IEmbeddingResult
        | IAISummary;

}










/**
 * ----------------------------------------------------------
 * Health Check
 * ----------------------------------------------------------
 */
export interface IAIHealth {

    provider: AIProvider;

    available: boolean;

    latency: number;

    model: string;

}