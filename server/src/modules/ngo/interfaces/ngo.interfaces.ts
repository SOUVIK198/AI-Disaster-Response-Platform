/**
 * ------------------------------------------------------------------
 * File: ngo.interface.ts
 *
 * TypeScript Interfaces for NGO Module
 * ------------------------------------------------------------------
 */

import {

    NGOType,

    NGOStatus,

    VerificationStatus,

    ReliefCategory,

    DonationType,

    InventoryUnit,

    VolunteerAssignmentStatus,

    DisasterPriority,

    NGOStaffRole,

    VehicleType

} from "./ngo.types";









/**
 * Geo Location
 */
export interface INGOLocation{

    type:"Point";

    coordinates:[number,number];

    address:string;

    city:string;

    district:string;

    state:string;

    country:string;

}









/**
 * Contact Information
 */
export interface INGOContact{

    phone:string;

    alternatePhone?:string;

    email:string;

    website?:string;

}









/**
 * Relief Inventory
 */
export interface IReliefInventory{

    category:ReliefCategory;

    quantity:number;

    unit:InventoryUnit;

    minimumRequired:number;

    lastUpdated:Date;

}









/**
 * NGO Staff
 */
export interface INGOStaff{

    name:string;

    role:NGOStaffRole;

    phone:string;

    email?:string;

    available:boolean;

}









/**
 * NGO Vehicle
 */
export interface INGOVehicle{

    vehicleNumber:string;

    type:VehicleType;

    driverName:string;

    capacity:number;

    available:boolean;

    currentLocation?:INGOLocation;

}









/**
 * Disaster Assignment
 */
export interface IDisasterAssignment{

    incidentId:string;

    priority:DisasterPriority;

    assignedAt:Date;

    completedAt?:Date;

    status:VolunteerAssignmentStatus;

}









/**
 * Donation Record
 */
export interface IDonation{

    donorName:string;

    donationType:DonationType;

    amount?:number;

    quantity?:number;

    unit?:InventoryUnit;

    donatedAt:Date;

}









/**
 * Operational Coverage
 */
export interface IOperationalArea{

    state:string;

    district:string;

    city:string;

}









/**
 * Main NGO Interface
 */
export interface INGO{

    _id?:string;

    ngoCode:string;

    name:string;

    description?:string;

    type:NGOType;

    status:NGOStatus;

    verificationStatus:VerificationStatus;

    location:INGOLocation;

    contact:INGOContact;

    inventory:IReliefInventory[];

    staff:INGOStaff[];

    vehicles:INGOVehicle[];

    assignments:IDisasterAssignment[];

    donations:IDonation[];

    operationalAreas:IOperationalArea[];

    managedBy:string;

    totalVolunteers:number;

    activeVolunteers:number;

    isActive:boolean;

    createdAt?:Date;

    updatedAt?:Date;

}