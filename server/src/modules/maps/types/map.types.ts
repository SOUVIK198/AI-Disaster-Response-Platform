/**
 * ------------------------------------------------------------------
 * File: maps.types.ts
 * ------------------------------------------------------------------
 */

export enum MapProvider {

    GOOGLE = "GOOGLE",

    MAPBOX = "MAPBOX",

    OPENSTREETMAP = "OPENSTREETMAP"

}










export enum TravelMode {

    DRIVING = "DRIVING",

    WALKING = "WALKING",

    BICYCLING = "BICYCLING",

    TRANSIT = "TRANSIT"

}










export enum LocationType {

    INCIDENT = "INCIDENT",

    SHELTER = "SHELTER",

    HOSPITAL = "HOSPITAL",

    NGO = "NGO",

    VOLUNTEER = "VOLUNTEER",

    USER = "USER"

}










export enum RoutePreference {

    FASTEST = "FASTEST",

    SHORTEST = "SHORTEST",

    SAFEST = "SAFEST",

    AVOID_FLOOD = "AVOID_FLOOD",

    AVOID_FIRE = "AVOID_FIRE"

}










export enum GeofenceEvent {

    ENTER = "ENTER",

    EXIT = "EXIT",

    INSIDE = "INSIDE",

    OUTSIDE = "OUTSIDE"

}










export enum HeatmapType {

    INCIDENT_DENSITY = "INCIDENT_DENSITY",

    VOLUNTEER_ACTIVITY = "VOLUNTEER_ACTIVITY",

    SHELTER_OCCUPANCY = "SHELTER_OCCUPANCY",

    HOSPITAL_LOAD = "HOSPITAL_LOAD"

}










export enum MarkerColor {

    RED = "RED",

    BLUE = "BLUE",

    GREEN = "GREEN",

    YELLOW = "YELLOW",

    ORANGE = "ORANGE",

    PURPLE = "PURPLE"

}










export enum RouteStatus {

    AVAILABLE = "AVAILABLE",

    BLOCKED = "BLOCKED",

    FLOODED = "FLOODED",

    UNDER_RESCUE = "UNDER_RESCUE"

}