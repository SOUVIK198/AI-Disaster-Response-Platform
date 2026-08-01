/**
 * ------------------------------------------------------------------
 * File: src/modules/volunteer/volunteer.types.ts
 * Description: Centralized enums, constants and helper types for the
 * Volunteer Module.
 * ------------------------------------------------------------------
 */

export enum VolunteerStatus {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  ON_MISSION = "ON_MISSION",
  OFFLINE = "OFFLINE",
  RESTING = "RESTING",
  SUSPENDED = "SUSPENDED",
}

export enum VolunteerRole {
  VOLUNTEER = "VOLUNTEER",
  TEAM_LEADER = "TEAM_LEADER",
  MEDICAL = "MEDICAL",
  PARAMEDIC = "PARAMEDIC",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  FIRE_RESCUE = "FIRE_RESCUE",
  SEARCH_RESCUE = "SEARCH_RESCUE",
  DRIVER = "DRIVER",
  LOGISTICS = "LOGISTICS",
  POLICE = "POLICE",
  NDRF = "NDRF",
  SDRF = "SDRF",
  ADMIN = "ADMIN",
}

export enum MissionStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EN_ROUTE = "EN_ROUTE",
  ARRIVED = "ARRIVED",
  WORKING = "WORKING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum SkillType {
  FIRST_AID = "FIRST_AID",
  CPR = "CPR",
  SEARCH_RESCUE = "SEARCH_RESCUE",
  SWIMMING = "SWIMMING",
  MOUNTAIN_RESCUE = "MOUNTAIN_RESCUE",
  FIRE_FIGHTING = "FIRE_FIGHTING",
  DRONE_OPERATION = "DRONE_OPERATION",
  AMBULANCE_DRIVING = "AMBULANCE_DRIVING",
  HEAVY_MACHINE = "HEAVY_MACHINE",
  COMMUNICATION = "COMMUNICATION",
  COOKING = "COOKING",
  LOGISTICS = "LOGISTICS",
  PSYCHOLOGICAL_SUPPORT = "PSYCHOLOGICAL_SUPPORT",
  CROWD_MANAGEMENT = "CROWD_MANAGEMENT",
  WATER_RESCUE = "WATER_RESCUE",
  ROPE_RESCUE = "ROPE_RESCUE",
}

export enum CertificationType {
  RED_CROSS = "RED_CROSS",
  NDRF = "NDRF",
  SDRF = "SDRF",
  CPR = "CPR",
  FIRST_AID = "FIRST_AID",
  FIRE_SAFETY = "FIRE_SAFETY",
  DISASTER_MANAGEMENT = "DISASTER_MANAGEMENT",
  PARAMEDIC = "PARAMEDIC",
}

export enum VehicleType {
  NONE = "NONE",
  BIKE = "BIKE",
  CAR = "CAR",
  AMBULANCE = "AMBULANCE",
  BOAT = "BOAT",
  TRUCK = "TRUCK",
  HELICOPTER = "HELICOPTER",
}

export enum ShiftType {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  FULL_TIME = "FULL_TIME",
  ON_CALL = "ON_CALL",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export enum AvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  ON_LEAVE = "ON_LEAVE",
  TRAINING = "TRAINING",
}

export enum MissionPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum DevicePlatform {
  ANDROID = "ANDROID",
  IOS = "IOS",
  WEB = "WEB",
}

export const MAX_ACTIVE_MISSIONS = 3;

export const MAX_SKILLS = 15;

export const MAX_CERTIFICATIONS = 10;

export const DEFAULT_SEARCH_RADIUS = 10000; // 10 KM

export const MAX_SEARCH_RADIUS = 50000; // 50 KM

export const LOCATION_UPDATE_INTERVAL = 30; // Seconds

export const LEADERBOARD_LIMIT = 100;

export const DEFAULT_PAGE_SIZE = 20;

export const MAX_PAGE_SIZE = 100;

export const MIN_RATING = 0;

export const MAX_RATING = 5;

export const ACTIVE_STATUSES = [
  VolunteerStatus.AVAILABLE,
  VolunteerStatus.BUSY,
  VolunteerStatus.ON_MISSION,
] as const;

export const INACTIVE_STATUSES = [
  VolunteerStatus.OFFLINE,
  VolunteerStatus.RESTING,
  VolunteerStatus.SUSPENDED,
] as const;

export const ASSIGNABLE_STATUSES = [
  VolunteerStatus.AVAILABLE,
] as const;

export const ACTIVE_MISSION_STATUSES = [
  MissionStatus.ASSIGNED,
  MissionStatus.ACCEPTED,
  MissionStatus.EN_ROUTE,
  MissionStatus.ARRIVED,
  MissionStatus.WORKING,
] as const;

export const FINISHED_MISSION_STATUSES = [
  MissionStatus.COMPLETED,
  MissionStatus.CANCELLED,
  MissionStatus.FAILED,
] as const;

export const DEFAULT_PERFORMANCE = {
  missionsCompleted: 0,
  missionsAccepted: 0,
  missionsRejected: 0,
  totalResponseTime: 0,
  averageResponseTime: 0,
  rescuedPeople: 0,
  hoursServed: 0,
  successRate: 100,
  rating: 5,
} as const;

export const VOLUNTEER_INDEXES = {
  LOCATION: "location_2dsphere",
  STATUS: "status_index",
  ROLE: "role_index",
  USER: "user_index",
  RATING: "rating_index",
} as const;

export type ActiveVolunteerStatus =
  (typeof ACTIVE_STATUSES)[number];

export type ActiveMissionStatus =
  (typeof ACTIVE_MISSION_STATUSES)[number];