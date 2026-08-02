/**
 * -------------------------------------------------------------
 * NGO Types
 * -------------------------------------------------------------
 */

/**
 * NGO Type
 */
export enum NGOType{

    GOVERNMENT="GOVERNMENT",

    NON_PROFIT="NON_PROFIT",

    INTERNATIONAL="INTERNATIONAL",

    LOCAL="LOCAL",

    PRIVATE="PRIVATE"

}









/**
 * NGO Status
 */
export enum NGOStatus{

    ACTIVE="ACTIVE",

    INACTIVE="INACTIVE",

    SUSPENDED="SUSPENDED"

}









/**
 * Verification Status
 */
export enum VerificationStatus{

    PENDING="PENDING",

    VERIFIED="VERIFIED",

    REJECTED="REJECTED"

}









/**
 * Relief Category
 */
export enum ReliefCategory{

    FOOD="FOOD",

    WATER="WATER",

    MEDICINE="MEDICINE",

    CLOTHES="CLOTHES",

    SHELTER="SHELTER",

    RESCUE="RESCUE",

    EDUCATION="EDUCATION",

    SANITATION="SANITATION"

}









/**
 * Donation Type
 */
export enum DonationType{

    MONEY="MONEY",

    FOOD="FOOD",

    MEDICINE="MEDICINE",

    CLOTHES="CLOTHES",

    EQUIPMENT="EQUIPMENT"

}









/**
 * Inventory Unit
 */
export enum InventoryUnit{

    KG="KG",

    LITER="LITER",

    BOX="BOX",

    PACKET="PACKET",

    PIECE="PIECE"

}









/**
 * Volunteer Assignment Status
 */
export enum VolunteerAssignmentStatus{

    ASSIGNED="ASSIGNED",

    IN_PROGRESS="IN_PROGRESS",

    COMPLETED="COMPLETED",

    CANCELLED="CANCELLED"

}









/**
 * Disaster Priority
 */
export enum DisasterPriority{

    LOW="LOW",

    MEDIUM="MEDIUM",

    HIGH="HIGH",

    CRITICAL="CRITICAL"

}









/**
 * NGO Staff Role
 */
export enum NGOStaffRole{

    ADMIN="ADMIN",

    COORDINATOR="COORDINATOR",

    FIELD_OFFICER="FIELD_OFFICER",

    DOCTOR="DOCTOR",

    DRIVER="DRIVER",

    VOLUNTEER_MANAGER="VOLUNTEER_MANAGER"

}









/**
 * Vehicle Type
 */
export enum VehicleType{

    TRUCK="TRUCK",

    PICKUP="PICKUP",

    VAN="VAN",

    AMBULANCE="AMBULANCE",

    BOAT="BOAT",

    HELICOPTER="HELICOPTER"

}