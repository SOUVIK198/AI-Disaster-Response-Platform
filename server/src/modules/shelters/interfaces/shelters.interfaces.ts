/**
 * ------------------------------------------------------------------
 * File: shelter.interface.ts
 *
 * TypeScript Interfaces for Shelter Module
 *
 * ------------------------------------------------------------------
 */

import {

    ShelterType,

    ShelterStatus,

    ShelterVerificationStatus,

    OccupancyStatus,

    ResourceType,

    ResourceUnit,

    FacilityType,

    EvacuationPriority,

    ShelterStaffRole

} from "./shelter.types";







/**
 * Geo Location
 */
export interface IShelterLocation{

    type:"Point";

    coordinates:[number,number];

    address:string;

    city:string;

    district:string;

    state:string;

    country:string;

}









/**
 * Shelter Capacity
 */
export interface IShelterCapacity{

    totalCapacity:number;

    currentOccupancy:number;

    availableCapacity:number;

    occupancyStatus:OccupancyStatus;

}









/**
 * Resource Inventory
 */
export interface IShelterResource{

    type:ResourceType;

    quantity:number;

    unit:ResourceUnit;

    minimumRequired:number;

    lastUpdated:Date;

}









/**
 * Shelter Facility
 */
export interface IShelterFacility{

    type:FacilityType;

    available:boolean;

    quantity?:number;

}









/**
 * Shelter Staff
 */
export interface IShelterStaff{

    name:string;

    role:ShelterStaffRole;

    phone:string;

    available:boolean;

}









/**
 * Evacuation Information
 */
export interface IEvacuationInfo{

    priority:EvacuationPriority;

    nearestSafeZone:string;

    evacuationRoute:string;

    transportAvailable:boolean;

}









/**
 * Contact Information
 */
export interface IContactInfo{

    phone:string;

    alternatePhone?:string;

    email?:string;

}









/**
 * Main Shelter Interface
 */
export interface IShelter{

    _id?:string;

    name:string;

    shelterCode:string;

    type:ShelterType;

    status:ShelterStatus;

    verificationStatus:
    ShelterVerificationStatus;

    location:IShelterLocation;

    contact:IContactInfo;

    capacity:IShelterCapacity;

    resources:IShelterResource[];

    facilities:IShelterFacility[];

    staff:IShelterStaff[];

    evacuation:IEvacuationInfo;

    managedBy:string;

    acceptsPets:boolean;

    acceptsSpecialNeeds:boolean;

    isActive:boolean;

    createdAt?:Date;

    updatedAt?:Date;

}