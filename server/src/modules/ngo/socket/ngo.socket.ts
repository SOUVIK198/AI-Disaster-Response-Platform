/**
 * ------------------------------------------------------------------
 * File: ngo.socket.ts
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

class NGOSocket {

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

            (

                socket: Socket

            ) => {

                console.log(

                    `NGO Socket Connected : ${socket.id}`

                );









                /**
                 * Join NGO Room
                 */
                socket.on(

                    "join_ngo",

                    (

                        ngoId: string

                    ) => {

                        socket.join(

                            `ngo:${ngoId}`

                        );

                    }

                );









                /**
                 * Leave NGO Room
                 */
                socket.on(

                    "leave_ngo",

                    (

                        ngoId: string

                    ) => {

                        socket.leave(

                            `ngo:${ngoId}`

                        );

                    }

                );









                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `NGO Socket Disconnected : ${socket.id}`

                        );

                    }

                );

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Incident Assigned
     * ----------------------------------------------------------
     */
    emitIncidentAssigned(

        ngoId: string,

        incident: any

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "incident_assigned",

            {

                incident,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Inventory Updated
     * ----------------------------------------------------------
     */
    emitInventoryUpdate(

        ngoId: string,

        inventory: any[]

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "inventory_updated",

            {

                inventory,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Donation Alert
     * ----------------------------------------------------------
     */
    emitDonation(

        ngoId: string,

        donation: any

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "donation_received",

            {

                donation,

                timestamp:

                new Date()

            }

        );

    }
    /**
 * ------------------------------------------------------------------
 * File: ngo.socket.ts
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

class NGOSocket {

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

            (

                socket: Socket

            ) => {

                console.log(

                    `NGO Socket Connected : ${socket.id}`

                );









                /**
                 * Join NGO Room
                 */
                socket.on(

                    "join_ngo",

                    (

                        ngoId: string

                    ) => {

                        socket.join(

                            `ngo:${ngoId}`

                        );

                    }

                );









                /**
                 * Leave NGO Room
                 */
                socket.on(

                    "leave_ngo",

                    (

                        ngoId: string

                    ) => {

                        socket.leave(

                            `ngo:${ngoId}`

                        );

                    }

                );









                socket.on(

                    "disconnect",

                    () => {

                        console.log(

                            `NGO Socket Disconnected : ${socket.id}`

                        );

                    }

                );

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Incident Assigned
     * ----------------------------------------------------------
     */
    emitIncidentAssigned(

        ngoId: string,

        incident: any

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "incident_assigned",

            {

                incident,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Inventory Updated
     * ----------------------------------------------------------
     */
    emitInventoryUpdate(

        ngoId: string,

        inventory: any[]

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "inventory_updated",

            {

                inventory,

                timestamp:

                new Date()

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Donation Alert
     * ----------------------------------------------------------
     */
    emitDonation(

        ngoId: string,

        donation: any

    ) {

        this.io.to(

            `ngo:${ngoId}`

        ).emit(

            "donation_received",

            {

                donation,

                timestamp:

                new Date()

            }

        );

    }