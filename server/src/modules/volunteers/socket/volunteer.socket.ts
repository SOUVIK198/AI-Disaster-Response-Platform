/**
 * ------------------------------------------------------------------
 * File: volunteer.socket.ts
 *
 * Real-time Volunteer Communication Layer
 *
 * Technology:
 * Socket.IO
 *
 * Flow:
 *
 * Mobile App
 *      |
 *      |
 * Socket Connection
 *      |
 *      |
 * Volunteer Socket
 *      |
 *      |
 * Volunteer Service
 *
 * ------------------------------------------------------------------
 */


import {
    Server,
    Socket
} from "socket.io";


import volunteerService from "./volunteer.service";





class VolunteerSocket {



    private io:Server;



    constructor(
        io:Server
    ){

        this.io = io;

    }







    /**
     * Initialize socket events
     */
    initialize(){



        this.io.on(

            "connection",

            (socket:Socket)=>{


                console.log(
                    "Volunteer connected:",
                    socket.id
                );



                this.handleVolunteerConnection(
                    socket
                );



            }

        );

    }









    /**
     * Handle volunteer connection
     */
    private handleVolunteerConnection(
        socket:Socket
    ){



        /**
         * Volunteer joins personal room
         *
         * Example:
         *
         * volunteer:65abc123
         */
        socket.on(

            "join-volunteer-room",

            (volunteerId:string)=>{


                socket.join(
                    `volunteer:${volunteerId}`
                );



                console.log(

                    `Volunteer ${volunteerId} joined`

                );


            }

        );









        /**
         * Volunteer joins incident room
         *
         * Used for:
         * - live rescue updates
         */
        socket.on(

            "join-incident-room",

            (incidentId:string)=>{


                socket.join(

                    `incident:${incidentId}`

                );


            }

        );









        /**
         * Disconnect event
         */
        socket.on(

            "disconnect",

            ()=>{


                console.log(

                    "Volunteer disconnected:",
                    socket.id

                );


            }

        );


    }





}



export default VolunteerSocket;
/**
 * Update volunteer live location
 *
 * Event:
 *
 * volunteer:update-location
 *
 * Payload:
 * {
 *   volunteerId,
 *   longitude,
 *   latitude
 * }
 */
private handleLocationUpdate(
    socket:Socket
){


    socket.on(

        "volunteer:update-location",

        async(data)=>{


            try{


                const {

                    volunteerId,

                    longitude,

                    latitude,

                    address


                } = data;




                const volunteer =

                await volunteerService
                .updateLocation(

                    volunteerId,

                    longitude,

                    latitude,

                    address

                );





                /**
                 * Send update to incident team
                 */
                this.io.emit(

                    "volunteer:location-updated",

                    {

                        volunteerId,

                        location:
                        volunteer?.location

                    }

                );



            }

            catch(error){


                socket.emit(

                    "socket:error",

                    {

                        message:
                        "Location update failed"

                    }

                );


            }


        }

    );


}









/**
 * Volunteer status change
 *
 * Event:
 *
 * volunteer:update-status
 */
private handleStatusUpdate(
    socket:Socket
){


    socket.on(

        "volunteer:update-status",

        async(data)=>{


            try{


                const {

                    volunteerId,

                    status

                } = data;





                const volunteer =

                await volunteerService
                .changeStatus(

                    volunteerId,

                    status

                );





                this.io.emit(

                    "volunteer:status-updated",

                    {

                        volunteerId,

                        status

                    }

                );



            }

            catch(error){


                socket.emit(

                    "socket:error",

                    {

                        message:
                        "Status update failed"

                    }

                );


            }


        }

    );


}









/**
 * Mission assigned notification
 */
sendMissionAssigned(
    volunteerId:string,
    mission:any
){



    this.io.to(

        `volunteer:${volunteerId}`

    )

    .emit(

        "mission:assigned",

        {

            message:
            "New rescue mission assigned",


            mission

        }

    );


}









/**
 * Mission accepted event
 */
sendMissionAccepted(
    incidentId:string,
    volunteer:any
){



    this.io.to(

        `incident:${incidentId}`

    )

    .emit(

        "mission:accepted",

        {

            volunteer

        }

    );


}









/**
 * Mission started event
 */
sendMissionStarted(
    incidentId:string,
    volunteer:any
){



    this.io.to(

        `incident:${incidentId}`

    )

    .emit(

        "mission:started",

        {

            volunteer

        }

    );


}









/**
 * Mission completed event
 */
sendMissionCompleted(
    incidentId:string,
    data:any
){



    this.io.to(

        `incident:${incidentId}`

    )

    .emit(

        "mission:completed",

        data

    );


}









/**
 * Emergency broadcast
 *
 * Sends alert to all volunteers
 */
broadcastEmergency(
    emergency:any
){



    this.io.emit(

        "emergency:alert",

        {


            title:
            "Emergency Alert",


            data:
            emergency


        }

    );


}
/**
 * Socket JWT Authentication
 *
 * Every socket connection
 * must provide token
 */
private authenticateSocket(){

    this.io.use(
        async(socket,next)=>{


            try{


                const token =

                socket.handshake
                .auth
                .token;



                if(!token){

                    return next(
                        new Error(
                            "Authentication required"
                        )
                    );

                }





                const decoded:any =

                jwt.verify(

                    token,

                    process.env.JWT_SECRET!

                );





                socket.data.user = decoded;




                next();


            }

            catch(error){


                next(

                    new Error(
                        "Invalid token"
                    )

                );


            }


        }

    );


}
initialize(){

    this.io.on(
        "connection",
        ...
    );

}
initialize(){


    /**
     * Enable JWT authentication
     */
    this.authenticateSocket();




    this.io.on(

        "connection",

        (socket:Socket)=>{


            console.log(

                "Authenticated socket:",

                socket.id

            );



            this.joinRoleRooms(
                socket
            );



            this.handleVolunteerConnection(
                socket
            );


        }

    );


}
/**
 * Join rooms based on user role
 */
private joinRoleRooms(
    socket:Socket
){



    const user =
    socket.data.user;



    if(!user){
        return;
    }





    /**
     * Volunteer room
     */
    if(
        user.role === "VOLUNTEER"
    ){


        socket.join(

            `volunteer:${user.id}`

        );


    }






    /**
     * Admin monitoring room
     */
    if(

        user.role === "ADMIN"

    ){


        socket.join(

            "admins"

        );


    }






    /**
     * Disaster response officer
     */
    if(

        user.role === "OFFICER"

    ){


        socket.join(

            "response-team"

        );


    }


}
/**
 * Send live updates to admins
 */
notifyAdmins(
    event:string,
    data:any
){



    this.io.to(

        "admins"

    )

    .emit(

        event,

        data

    );


}
/**
 * Send live updates to admins
 */
notifyAdmins(
    event:string,
    data:any
){



    this.io.to(

        "admins"

    )

    .emit(

        event,

        data

    );


}
export default VolunteerSocket;