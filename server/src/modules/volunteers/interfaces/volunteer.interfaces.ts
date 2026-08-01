/**
 * ------------------------------------------------------------------
 * File: src/modules/volunteer/volunteer.interface.ts
 * Description:
 * TypeScript interfaces for Volunteer Module.
 * ------------------------------------------------------------------
 */

import { Document, Types } from "mongoose";

import {
  AvailabilityStatus,
  BloodGroup,
  CertificationType,
  DevicePlatform,
  MissionPriority,
  MissionStatus,
  ShiftType,
  SkillType,
  VehicleType,
  VolunteerRole,
  VolunteerStatus,
} from "./volunteer.types";

/* -------------------------------------------------------------------------- */
/*                                  LOCATION                                  */
/* -------------------------------------------------------------------------- */

export interface IGeoLocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

/* -------------------------------------------------------------------------- */
/*                             EMERGENCY CONTACT                              */
/* -------------------------------------------------------------------------- */

export interface IEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                   */
/* -------------------------------------------------------------------------- */

export interface ISkill {
  name: SkillType;
  level: number; // 1-5
  experienceInYears?: number;
}

/* -------------------------------------------------------------------------- */
/*                              CERTIFICATIONS                                */
/* -------------------------------------------------------------------------- */

export interface ICertification {
  name: CertificationType;
  issuedBy: string;
  certificateId?: string;
  issuedAt?: Date;
  expiresAt?: Date;
  verified: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                AVAILABILITY                                */
/* -------------------------------------------------------------------------- */

export interface IAvailability {
  status: AvailabilityStatus;
  shift: ShiftType;
  availableFrom?: Date;
  availableUntil?: Date;
}

/* -------------------------------------------------------------------------- */
/*                                   VEHICLE                                  */
/* -------------------------------------------------------------------------- */

export interface IVehicle {
  type: VehicleType;
  vehicleNumber?: string;
  drivingLicenseNumber?: string;
}

/* -------------------------------------------------------------------------- */
/*                              CURRENT MISSION                               */
/* -------------------------------------------------------------------------- */

export interface IMission {
  incident: Types.ObjectId;

  priority: MissionPriority;

  status: MissionStatus;

  assignedAt?: Date;

  acceptedAt?: Date;

  startedAt?: Date;

  reachedAt?: Date;

  completedAt?: Date;

  estimatedArrivalTime?: Date;

  notes?: string;
}

/* -------------------------------------------------------------------------- */
/*                               PERFORMANCE                                  */
/* -------------------------------------------------------------------------- */

export interface IPerformance {
  missionsCompleted: number;

  missionsAccepted: number;

  missionsRejected: number;

  rescuedPeople: number;

  hoursServed: number;

  averageResponseTime: number;

  totalResponseTime: number;

  successRate: number;

  rating: number;
}

/* -------------------------------------------------------------------------- */
/*                               DEVICE INFO                                  */
/* -------------------------------------------------------------------------- */

export interface IDeviceInfo {
  platform: DevicePlatform;

  deviceId?: string;

  fcmToken?: string;

  lastActiveAt?: Date;
}

/* -------------------------------------------------------------------------- */
/*                                VOLUNTEER                                   */
/* -------------------------------------------------------------------------- */

export interface IVolunteer extends Document {
  user: Types.ObjectId;

  volunteerId: string;

  role: VolunteerRole;

  status: VolunteerStatus;

  location: IGeoLocation;

  skills: ISkill[];

  certifications: ICertification[];

  availability: IAvailability;

  currentMission?: IMission;

  completedMissions: Types.ObjectId[];

  emergencyContact: IEmergencyContact;

  vehicle?: IVehicle;

  performance: IPerformance;

  bloodGroup?: BloodGroup;

  gender?: string;

  age?: number;

  languages: string[];

  profilePhoto?: string;

  isVerified: boolean;

  isActive: boolean;

  lastLocationUpdate?: Date;

  device?: IDeviceInfo;

  createdAt: Date;

  updatedAt: Date;
}