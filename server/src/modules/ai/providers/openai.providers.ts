/**
 * ------------------------------------------------------------------
 * File: providers/openai.provider.ts
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";

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

class OpenAIProvider implements IAIProvider {

    private client: OpenAI;

    constructor() {

        this.client = new OpenAI({

            apiKey: process.env.OPENAI_API_KEY

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

        const completion =

        await this.client.chat.completions.create({

            model:

            request.model ||

            process.env.OPENAI_CHAT_MODEL ||

            "gpt-4.1-mini",

            messages:

            request.messages.map(message => ({

                role: message.role.toLowerCase() as
                "system" | "user" | "assistant",

                content: message.content

            })),

            temperature:

            request.temperature,

            max_tokens:

            request.maxTokens

        });

        return {

            provider:

            AIProvider.OPENAI,

            model:

            completion.model,

            response:

            completion.choices[0]?.message?.content || "",

            usage: {

                promptTokens:

                completion.usage?.prompt_tokens ?? 0,

                completionTokens:

                completion.usage?.completion_tokens ?? 0,

                totalTokens:

                completion.usage?.total_tokens ?? 0

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

        await this.client.embeddings.create({

            model:

            process.env.OPENAI_EMBEDDING_MODEL ||

            "text-embedding-3-small",

            input: text

        });

        return {

            provider:

            AIProvider.OPENAI,

            model:

            result.model,

            dimensions:

            result.data[0].embedding.length,

            embedding:

            result.data[0].embedding

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

        const completion =

        await this.client.chat.completions.create({

            model:

            process.env.OPENAI_CHAT_MODEL ||

            "gpt-4.1-mini",

            messages: [

                {

                    role: "system",

                    content:
`You are a disaster prediction expert.
Return ONLY one JSON object.`

                },

                {

                    role: "user",

                    content: input

                }

            ],

            response_format: {

                type: "json_object"

            }

        });

        const prediction = JSON.parse(

            completion.choices[0].message.content ||

            "{}"

        );

        return {

            task:

            AITask.PREDICT,

            severity:

            prediction.severity ||

            Severity.MEDIUM,

            confidence:

            prediction.confidence ||

            0.85,

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

        const completion =

        await this.client.chat.completions.create({

            model:

            process.env.OPENAI_CHAT_MODEL ||

            "gpt-4.1-mini",

            messages: [

                {

                    role: "system",

                    content:
                    "Summarize the disaster incident."

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

            completion.choices[0].message.content ||

            "",

            generatedAt:

            new Date()

        };

    }










    /**
     * ----------------------------------------------------------
     * Recommendations
     * ----------------------------------------------------------
     */
    async recommend(
        input: string
    ): Promise<IRecommendation[]> {

        const completion =

        await this.client.chat.completions.create({

            model:

            process.env.OPENAI_CHAT_MODEL ||

            "gpt-4.1-mini",

            messages: [

                {

                    role: "system",

                    content:
`Recommend disaster resources.
Return JSON array.`

                },

                {

                    role: "user",

                    content: input

                }

            ],

            response_format: {

                type: "json_object"

            }

        });

        const json = JSON.parse(

            completion.choices[0].message.content ||

            "{}"

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

            item.confidence || 0.9

        }));

    }










    /**
     * ----------------------------------------------------------
     * Provider Health
     * ----------------------------------------------------------
     */
    async health(): Promise<boolean> {

        try {

            await this.client.models.list();

            return true;

        }

        catch {

            return false;

        }

    }

}