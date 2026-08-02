/**
 * ------------------------------------------------------------------
 * File: providers/ollama.provider.ts
 * ------------------------------------------------------------------
 */

import { Ollama } from "ollama";

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

class OllamaProvider implements IAIProvider {

    private client: Ollama;










    constructor() {

        this.client = new Ollama({

            host:

            process.env.OLLAMA_BASE_URL ||

            "http://localhost:11434"

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

        await this.client.chat({

            model:

            request.model ||

            process.env.OLLAMA_CHAT_MODEL ||

            "llama3.1",

            messages:

            request.messages.map(message => ({

                role:

                message.role.toLowerCase() as
                "system" | "user" | "assistant",

                content:

                message.content

            }))

        });

        return {

            provider:

            AIProvider.OLLAMA,

            model:

            response.model,

            response:

            response.message.content,

            usage: {

                promptTokens:

                response.prompt_eval_count ?? 0,

                completionTokens:

                response.eval_count ?? 0,

                totalTokens:

                (response.prompt_eval_count ?? 0) +

                (response.eval_count ?? 0)

            }

        };

    }










    /**
     * ----------------------------------------------------------
     * Embedding Generation
     * ----------------------------------------------------------
     */
    async embeddings(
        text: string
    ): Promise<IEmbeddingResult> {

        const result =

        await this.client.embed({

            model:

            process.env.OLLAMA_EMBEDDING_MODEL ||

            "nomic-embed-text",

            input:

            text

        });

        return {

            provider:

            AIProvider.OLLAMA,

            model:

            process.env.OLLAMA_EMBEDDING_MODEL ||

            "nomic-embed-text",

            dimensions:

            result.embeddings[0].length,

            embedding:

            result.embeddings[0]

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

        await this.client.chat({

            model:

            process.env.OLLAMA_CHAT_MODEL ||

            "llama3.1",

            messages: [

                {

                    role: "system",

                    content:
`You are a disaster prediction AI.

Return ONLY valid JSON.

{
    "severity":"LOW|MEDIUM|HIGH|CRITICAL",
    "confidence":0.95,
    "prediction":"..."
}`

                },

                {

                    role: "user",

                    content: input

                }

            ]

        });

        const prediction = JSON.parse(

            response.message.content

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
     * Incident Summary
     * ----------------------------------------------------------
     */
    async summarize(
        text: string
    ): Promise<IAISummary> {

        const response =

        await this.client.chat({

            model:

            process.env.OLLAMA_CHAT_MODEL ||

            "llama3.1",

            messages: [

                {

                    role: "system",

                    content:

                    "Summarize this disaster incident."

                },

                {

                    role: "user",

                    content: text

                }

            ]

        });

        return {

            title:

            "Incident Summary",

            summary:

            response.message.content,

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

        await this.client.chat({

            model:

            process.env.OLLAMA_CHAT_MODEL ||

            "llama3.1",

            messages: [

                {

                    role: "system",

                    content:
`Return ONLY JSON.

{
  "recommendations":[]
}`

                },

                {

                    role: "user",

                    content: input

                }

            ]

        });

        const json = JSON.parse(

            response.message.content

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

            0.90

        }));

    }










    /**
     * ----------------------------------------------------------
     * Provider Health Check
     * ----------------------------------------------------------
     */
    async health(): Promise<boolean> {

        try {

            await this.client.list();

            return true;

        }

        catch {

            return false;

        }

    }

}