/**
 * ------------------------------------------------------------------
 * File: ai.types.ts
 * ------------------------------------------------------------------
 */

/**
 * AI Provider
 */
export enum AIProvider {

    OPENAI = "OPENAI",

    GEMINI = "GEMINI",

    OLLAMA = "OLLAMA"

}










/**
 * AI Task
 */
export enum AITask {

    CHAT = "CHAT",

    SUMMARIZE = "SUMMARIZE",

    CLASSIFY = "CLASSIFY",

    PREDICT = "PREDICT",

    RECOMMEND = "RECOMMEND",

    EMBEDDING = "EMBEDDING"

}










/**
 * Disaster Severity
 */
export enum Severity {

    LOW = "LOW",

    MEDIUM = "MEDIUM",

    HIGH = "HIGH",

    CRITICAL = "CRITICAL"

}










/**
 * Recommendation Type
 */
export enum RecommendationType {

    VOLUNTEER = "VOLUNTEER",

    HOSPITAL = "HOSPITAL",

    SHELTER = "SHELTER",

    RESOURCE = "RESOURCE"

}










/**
 * Prediction Status
 */
export enum PredictionStatus {

    PENDING = "PENDING",

    PROCESSING = "PROCESSING",

    COMPLETED = "COMPLETED",

    FAILED = "FAILED"

}










/**
 * Chat Role
 */
export enum ChatRole {

    SYSTEM = "SYSTEM",

    USER = "USER",

    ASSISTANT = "ASSISTANT"

}










/**
 * Model Type
 */
export enum ModelType {

    TEXT = "TEXT",

    MULTIMODAL = "MULTIMODAL",

    EMBEDDING = "EMBEDDING"

}