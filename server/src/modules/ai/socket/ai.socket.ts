/**
 * ------------------------------------------------------------------
 * File: ai.socket.ts
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

class AISocket {

    private io: Server;










    constructor(
        io: Server
    ) {

        this.io = io;

    }










    /**
     * ----------------------------------------------------------
     * Register Socket Events
     * ----------------------------------------------------------
     */
    register() {

        this.io.on(

            "connection",

            (socket: Socket) => {

                console.log(

                    `AI Socket Connected: ${socket.id}`

                );









                /**
                 * Join AI Room
                 */
                socket.on(

                    "join_ai",

                    (userId: string) => {

                        socket.join(

                            `ai:${userId}`

                        );

                    }

                );









                /**
                 * Leave AI Room
                 */
                socket.on(

                    "leave_ai",

                    (userId: string) => {

                        socket.leave(

                            `ai:${userId}`

                        );

                    }

                );









                /**
                 * Chat Stream Started
                 */
                socket.on(

                    "chat_start",

                    () => {

                        socket.emit(

                            "chat_started",

                            {

                                timestamp:

                                new Date()

                            }

                        );

                    }

                );









                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `AI Socket Disconnected: ${socket.id}`

                        );

                    }

                );

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Stream Chat Token
     * ----------------------------------------------------------
     */
    streamToken(

        userId: string,

        token: string

    ) {

        this.io.to(

            `ai:${userId}`

        ).emit(

            "chat_token",

            {

                token,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Chat Completed
     * ----------------------------------------------------------
     */
    chatCompleted(

        userId: string,

        response: string

    ) {

        this.io.to(

            `ai:${userId}`

        ).emit(

            "chat_completed",

            {

                response,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Prediction Progress
     * ----------------------------------------------------------
     */
    predictionProgress(

        userId: string,

        percentage: number

    ) {

        this.io.to(

            `ai:${userId}`

        ).emit(

            "prediction_progress",

            {

                percentage,

                timestamp:

                new Date()

            }

        );

    }

}
/**
 * ----------------------------------------------------------
 * Prediction Completed
 * ----------------------------------------------------------
 */
predictionCompleted(

    userId: string,

    prediction: any

) {

    this.io.to(

        `ai:${userId}`

    ).emit(

        "prediction_completed",

        {

            prediction,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Recommendation Updated
 * ----------------------------------------------------------
 */
recommendationUpdated(

    userId: string,

    recommendations: any[]

) {

    this.io.to(

        `ai:${userId}`

    ).emit(

        "recommendation_updated",

        {

            recommendations,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * AI Summary Generated
 * ----------------------------------------------------------
 */
summaryGenerated(

    userId: string,

    summary: any

) {

    this.io.to(

        `ai:${userId}`

    ).emit(

        "summary_generated",

        {

            summary,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Embedding Completed
 * ----------------------------------------------------------
 */
embeddingCompleted(

    userId: string,

    embedding: any

) {

    this.io.to(

        `ai:${userId}`

    ).emit(

        "embedding_completed",

        {

            embedding,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Provider Status Updated
 * ----------------------------------------------------------
 */
providerStatusUpdated(

    provider: string,

    available: boolean

) {

    this.io.emit(

        "provider_status_updated",

        {

            provider,

            available,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * AI Health Broadcast
 * ----------------------------------------------------------
 */
healthBroadcast(

    health: any[]

) {

    this.io.emit(

        "ai_health",

        {

            health,

            timestamp: new Date()

        }

    );

}










/**
 * ----------------------------------------------------------
 * Global AI Notification
 * ----------------------------------------------------------
 */
broadcast(

    event: string,

    payload: any

) {

    this.io.emit(

        event,

        {

            ...payload,

            timestamp: new Date()

        }

    );

}