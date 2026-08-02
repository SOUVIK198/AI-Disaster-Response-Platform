/**
 * ------------------------------------------------------------------
 * File: maps.socket.ts
 * ------------------------------------------------------------------
 */

import { Server, Socket } from "socket.io";

import mapsService from "./maps.service";

class MapsSocket {

    /**
     * ----------------------------------------------------------
     * Register Socket Events
     * ----------------------------------------------------------
     */
    initialize(io: Server) {

        io.of("/maps").on(

            "connection",

            (socket: Socket) => {

                console.log(

                    `Maps Client Connected: ${socket.id}`

                );

                /**
                 * ------------------------------------------
                 * Join Incident Room
                 * ------------------------------------------
                 */
                socket.on(

                    "join-incident",

                    (incidentId: string) => {

                        socket.join(

                            `incident:${incidentId}`

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Leave Incident Room
                 * ------------------------------------------
                 */
                socket.on(

                    "leave-incident",

                    (incidentId: string) => {

                        socket.leave(

                            `incident:${incidentId}`

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Live Volunteer Location
                 * ------------------------------------------
                 */
                socket.on(

                    "volunteer-location",

                    async (payload) => {

                        io.of("/maps")

                        .emit(

                            "volunteer-updated",

                            payload

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Ambulance Location
                 * ------------------------------------------
                 */
                socket.on(

                    "ambulance-location",

                    async (payload) => {

                        io.of("/maps")

                        .emit(

                            "ambulance-updated",

                            payload

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Rescue Team Location
                 * ------------------------------------------
                 */
                socket.on(

                    "rescue-location",

                    async (payload) => {

                        io.of("/maps")

                        .emit(

                            "rescue-updated",

                            payload

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Geofence Check
                 * ------------------------------------------
                 */
                socket.on(

                    "geofence-check",

                    async (payload) => {

                        const result =

                        await mapsService.geofence(

                            payload.location,

                            payload.geofence

                        );

                        socket.emit(

                            "geofence-result",

                            result

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Route Request
                 * ------------------------------------------
                 */
                socket.on(

                    "route-request",

                    async (payload) => {

                        const route =

                        await mapsService.route(

                            payload

                        );

                        socket.emit(

                            "route-response",

                            route

                        );

                    }

                );

                /**
                 * ------------------------------------------
                 * Disconnect
                 * ------------------------------------------
                 */
                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `Maps Client Disconnected: ${socket.id}`

                        );

                    }

                );

            }

        );

    }

}

export default new MapsSocket();