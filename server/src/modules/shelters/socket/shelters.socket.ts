/**
 * ------------------------------------------------------------------
 * File: shelter.socket.ts
 *
 * Real-Time Shelter Events
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

import jwt from "jsonwebtoken";

class ShelterSocket {

    private io: Server;

    constructor(io: Server) {

        this.io = io;

    }










    /**
     * Authenticate Socket
     */
    private authenticate() {

        this.io.use(

            (socket, next) => {

                try {

                    const token =

                        socket.handshake
                            .auth
                            ?.token;

                    if (!token) {

                        return next(

                            new Error(
                                "Authentication required"
                            )

                        );

                    }

                    const user: any =

                        jwt.verify(

                            token,

                            process.env.JWT_SECRET!

                        );

                    socket.data.user = user;

                    next();

                }

                catch {

                    next(

                        new Error(
                            "Invalid token"
                        )

                    );

                }

            }

        );

    }










    /**
     * Initialize Socket
     */
    initialize() {

        this.authenticate();

        this.io.on(

            "connection",

            (socket: Socket) => {

                console.log(

                    "Shelter socket connected:",

                    socket.id

                );

                this.joinRooms(socket);

                this.registerEvents(socket);

            }

        );

    }










    /**
     * Join Socket Rooms
     */
    private joinRooms(
        socket: Socket
    ) {

        const user = socket.data.user;

        if (!user) return;

        if (

            user.role ===

            "SHELTER_ADMIN"

        ) {

            socket.join(

                `shelter:${user.shelterId}`

            );

        }

        if (

            user.role ===

            "VOLUNTEER"

        ) {

            socket.join(

                `volunteer:${user.shelterId}`

            );

        }

        if (

            user.role ===

            "ADMIN"

        ) {

            socket.join(

                "shelter-admins"

            );

        }

    }










    /**
     * Register Events
     */
    private registerEvents(
        socket: Socket
    ) {

        socket.on(

            "join_shelter",

            (shelterId: string) => {

                socket.join(

                    `shelter:${shelterId}`

                );

            }

        );

        socket.on(

            "disconnect",

            () => {

                console.log(

                    "Shelter socket disconnected"

                );

            }

        );

    }

}

export default ShelterSocket;
/**
 * ------------------------------------------------------------------
 * File: shelter.socket.ts
 *
 * Real-Time Shelter Events
 * ------------------------------------------------------------------
 */

import {

    Server,

    Socket

} from "socket.io";

import jwt from "jsonwebtoken";

class ShelterSocket {

    private io: Server;

    constructor(io: Server) {

        this.io = io;

    }










    /**
     * Authenticate Socket
     */
    private authenticate() {

        this.io.use(

            (socket, next) => {

                try {

                    const token =

                        socket.handshake
                            .auth
                            ?.token;

                    if (!token) {

                        return next(

                            new Error(
                                "Authentication required"
                            )

                        );

                    }

                    const user: any =

                        jwt.verify(

                            token,

                            process.env.JWT_SECRET!

                        );

                    socket.data.user = user;

                    next();

                }

                catch {

                    next(

                        new Error(
                            "Invalid token"
                        )

                    );

                }

            }

        );

    }










    /**
     * Initialize Socket
     */
    initialize() {

        this.authenticate();

        this.io.on(

            "connection",

            (socket: Socket) => {

                console.log(

                    "Shelter socket connected:",

                    socket.id

                );

                this.joinRooms(socket);

                this.registerEvents(socket);

            }

        );

    }










    /**
     * Join Socket Rooms
     */
    private joinRooms(
        socket: Socket
    ) {

        const user = socket.data.user;

        if (!user) return;

        if (

            user.role ===

            "SHELTER_ADMIN"

        ) {

            socket.join(

                `shelter:${user.shelterId}`

            );

        }

        if (

            user.role ===

            "VOLUNTEER"

        ) {

            socket.join(

                `volunteer:${user.shelterId}`

            );

        }

        if (

            user.role ===

            "ADMIN"

        ) {

            socket.join(

                "shelter-admins"

            );

        }

    }










    /**
     * Register Events
     */
    private registerEvents(
        socket: Socket
    ) {

        socket.on(

            "join_shelter",

            (shelterId: string) => {

                socket.join(

                    `shelter:${shelterId}`

                );

            }

        );

        socket.on(

            "disconnect",

            () => {

                console.log(

                    "Shelter socket disconnected"

                );

            }

        );

    }

}

export default ShelterSocket;