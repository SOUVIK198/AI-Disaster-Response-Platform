import mongoose, { Schema, Model } from "mongoose";

import {
    VolunteerStatus,
    VolunteerRole,
    MissionStatus,
    AvailabilityStatus,
    VehicleType,
    SkillType,
    CertificationType,
    ShiftType
} from "./volunteer.types";

import { IVolunteer } from "./volunteer.interface";