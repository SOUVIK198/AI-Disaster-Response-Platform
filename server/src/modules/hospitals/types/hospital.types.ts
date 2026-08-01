/**
 * ------------------------------------------------------------------
 * File: hospital.types.ts
 *
 * Enums and constants used by Hospital Module
 *
 * ------------------------------------------------------------------
 */



/**
 * Hospital Type
 */
export enum HospitalType {


    GOVERNMENT =
    "GOVERNMENT",


    PRIVATE =
    "PRIVATE",


    NGO =
    "NGO",


    MILITARY =
    "MILITARY"


}







/**
 * Hospital Verification Status
 */
export enum HospitalVerificationStatus {


    PENDING =
    "PENDING",


    VERIFIED =
    "VERIFIED",


    REJECTED =
    "REJECTED"


}








/**
 * Hospital Operational Status
 */
export enum HospitalStatus {


    ACTIVE =
    "ACTIVE",


    TEMPORARILY_CLOSED =
    "TEMPORARILY_CLOSED",


    FULL_CAPACITY =
    "FULL_CAPACITY",


    EMERGENCY_ONLY =
    "EMERGENCY_ONLY",


    INACTIVE =
    "INACTIVE"


}








/**
 * Bed Types
 */
export enum BedType {


    GENERAL =
    "GENERAL",


    ICU =
    "ICU",


    ICU_VENTILATOR =
    "ICU_VENTILATOR",


    EMERGENCY =
    "EMERGENCY",


    ISOLATION =
    "ISOLATION"


}








/**
 * Ambulance Status
 */
export enum AmbulanceStatus {


    AVAILABLE =
    "AVAILABLE",


    ON_MISSION =
    "ON_MISSION",


    MAINTENANCE =
    "MAINTENANCE",


    OFFLINE =
    "OFFLINE"


}








/**
 * Blood Group Types
 */
export enum BloodGroup {


    A_POSITIVE =
    "A+",


    A_NEGATIVE =
    "A-",


    B_POSITIVE =
    "B+",


    B_NEGATIVE =
    "B-",


    AB_POSITIVE =
    "AB+",


    AB_NEGATIVE =
    "AB-",


    O_POSITIVE =
    "O+",


    O_NEGATIVE =
    "O-"


}








/**
 * Patient Emergency Level
 */
export enum EmergencyLevel {


    LOW =
    "LOW",


    MEDIUM =
    "MEDIUM",


    HIGH =
    "HIGH",


    CRITICAL =
    "CRITICAL"


}








/**
 * Department Types
 */
export enum DepartmentType {


    CARDIOLOGY =
    "CARDIOLOGY",


    ORTHOPEDIC =
    "ORTHOPEDIC",


    NEUROLOGY =
    "NEUROLOGY",


    TRAUMA =
    "TRAUMA",


    GENERAL_MEDICINE =
    "GENERAL_MEDICINE",


    SURGERY =
    "SURGERY"


}








/**
 * Staff Roles
 */
export enum MedicalStaffRole {


    DOCTOR =
    "DOCTOR",


    NURSE =
    "NURSE",


    PARAMEDIC =
    "PARAMEDIC",


    TECHNICIAN =
    "TECHNICIAN"


}