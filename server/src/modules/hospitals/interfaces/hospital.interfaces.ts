/**
 * ------------------------------------------------------------------
 * File: hospital.interface.ts
 *
 * TypeScript Interfaces for Hospital Module
 *
 * ------------------------------------------------------------------
 */


import {
    HospitalType,
    HospitalStatus,
    HospitalVerificationStatus,
    BedType,
    AmbulanceStatus,
    BloodGroup,
    EmergencyLevel,
    DepartmentType,
    MedicalStaffRole
} from "./hospital.types";





/**
 * Geo Location Interface
 */
export interface IHospitalLocation {


    type:"Point";


    coordinates:[

        number,

        number

    ];


    address:string;


    city:string;


    district:string;


    state:string;


    country:string;


}









/**
 * Bed Information
 */
export interface IBed {


    type:BedType;


    total:number;


    available:number;


    occupied:number;


}









/**
 * ICU Information
 */
export interface IICU {


    totalBeds:number;


    availableBeds:number;


    ventilators:number;


    availableVentilators:number;


}









/**
 * Blood Inventory
 */
export interface IBloodInventory {


    bloodGroup:BloodGroup;


    units:number;


    lastUpdated:Date;


}









/**
 * Ambulance Information
 */
export interface IAmbulance {


    ambulanceNumber:string;


    status:AmbulanceStatus;


    driverName:string;


    driverPhone:string;


    location?:IHospitalLocation;


}









/**
 * Medical Staff
 */
export interface IMedicalStaff {


    name:string;


    role:MedicalStaffRole;


    specialization?:DepartmentType;


    experience:number;


    available:boolean;


}









/**
 * Emergency Capacity
 */
export interface IEmergencyCapacity {


    currentPatients:number;


    maximumCapacity:number;


    emergencyLevel:EmergencyLevel;


    acceptingPatients:boolean;


}









/**
 * Main Hospital Interface
 */
export interface IHospital {


    _id?:string;



    name:string;



    registrationNumber:string;



    type:HospitalType;



    status:HospitalStatus;



    verificationStatus:
    HospitalVerificationStatus;




    location:IHospitalLocation;



    phone:string;



    email:string;



    website?:string;




    departments:
    DepartmentType[];





    beds:
    IBed[];





    icu:
    IICU;





    bloodInventory:
    IBloodInventory[];





    ambulances:
    IAmbulance[];





    medicalStaff:
    IMedicalStaff[];





    emergencyCapacity:
    IEmergencyCapacity;





    isActive:boolean;



    createdAt?:Date;



    updatedAt?:Date;


}