/**
 * ------------------------------------------------------------------
 * File: providers/gemini.provider.ts
 * ------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";

import { IAIProvider } from "./ai.provider";

import {

    IChatRequest,
    IChatResponse,
    IEmbeddingResult,
    IPrediction,
    IAISummary,
    IRecommendation

} from "../ai.interface";

import {

    AIProvider,
    AITask,
    Severity,
    PredictionStatus,
    RecommendationType

} from "../ai.types";

class GeminiProvider implements IAIProvider {

    private client: GoogleGenAI;










    constructor() {

        this.client = new GoogleGenAI({

            apiKey: process.env.GEMINI_API_KEY!

        });

    }










    /**
     * ----------------------------------------------------------
     * Chat Completion
     * ----------------------------------------------------------
     */
    async chat(
        request: IChatRequest
    ): Promise<IChatResponse> {

        const response =

        await this.client.models.generateContent({

            model:

            request.model ||

            process.env.GEMINI_CHAT_MODEL ||

            "gemini-2.5-flash",

            contents:

            request.messages

                .map(message => message.content)

                .join("\n")

        });

        return {

            provider:

            AIProvider.GEMINI,

            model:

            process.env.GEMINI_CHAT_MODEL ||

            "gemini-2.5-flash",

            response:

            response.text,

            usage: {

                promptTokens: 0,

                completionTokens: 0,

                totalTokens: 0

            }

        };

    }










    /**
     * ----------------------------------------------------------
     * Embeddings
     * ----------------------------------------------------------
     */
    async embeddings(
        text: string
    ): Promise<IEmbeddingResult> {

        const result =

        await this.client.models.embedContent({

            model:

            process.env.GEMINI_EMBEDDING_MODEL ||

            "text-embedding-004",

            contents: text

        });

        return {

            provider:

            AIProvider.GEMINI,

            model:

            process.env.GEMINI_EMBEDDING_MODEL ||

            "text-embedding-004",

            dimensions:

            result.embeddings[0].values.length,

            embedding:

            result.embeddings[0].values

        };

    }
        /**
     * ----------------------------------------------------------
     * Disaster Prediction
     * ----------------------------------------------------------
     */
    async predict(
        input: string
    ): Promise<IPrediction> {

        const response =

        await this.client.models.generateContent({

            model:

            process.env.GEMINI_CHAT_MODEL ||

            "gemini-2.5-flash",

            contents:
`You are a disaster prediction expert.

Return ONLY a JSON object with:

{
  "severity":"LOW|MEDIUM|HIGH|CRITICAL",
  "confidence":0.95,
  "prediction":"..."
}

Incident:

${input}`

        });

        const prediction = JSON.parse(

            response.text

        );

        return {

            task:

            AITask.PREDICT,

            severity:

            prediction.severity ||

            Severity.MEDIUM,

            confidence:

            prediction.confidence ||

            0.90,

            prediction:

            prediction.prediction ||

            "Prediction unavailable.",

            status:

            PredictionStatus.COMPLETED

        };

    }










    /**
     * ----------------------------------------------------------
     * Summarize Incident
     * ----------------------------------------------------------
     */
    async summarize(
        text: string
    ): Promise<IAISummary> {

        const response =

        await this.client.models.generateContent({

            model:

            process.env.GEMINI_CHAT_MODEL ||

            "gemini-2.5-flash",

            contents:
`Summarize this disaster incident.

${text}`

        });

        return {

            title:

            "Incident Summary",

            summary:

            response.text,

            generatedAt:

            new Date()

        };

    }










    /**
     * ----------------------------------------------------------
     * Recommendation Engine
     * ----------------------------------------------------------
     */
    async recommend(
        input: string
    ): Promise<IRecommendation[]> {

        const response =

        await this.client.models.generateContent({

            model:

            process.env.GEMINI_CHAT_MODEL ||

            "gemini-2.5-flash",

            contents:
`Return ONLY JSON.

{
  "recommendations":[]
}

Incident:

${input}`

        });

        const json = JSON.parse(

            response.text

        );

        return (

            json.recommendations ||

            []

        ).map((item: any) => ({

            type:

            item.type ||

            RecommendationType.RESOURCE,

            title:

            item.title,

            description:

            item.description,

            confidence:

            item.confidence ||

            0.9

        }));

    }










    /**
     * ----------------------------------------------------------
     * Provider Health Check
     * ----------------------------------------------------------
     */
    async health(): Promise<boolean> {

        try {

            await this.client.models.generateContent({

                model:

                process.env.GEMINI_CHAT_MODEL ||

                "gemini-2.5-flash",

                contents:

                "health check"

            });

            return true;

        }

        catch {

            return false;

        }

    }

}