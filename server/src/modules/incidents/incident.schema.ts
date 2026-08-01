/**
 * Incident Response
 */
export interface IncidentResponse {
  id: string;
  title: string;
  description: string;

  disasterType: DisasterType;
  severity: Severity;
  status: IncidentStatus;

  latitude: number;
  longitude: number;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;

  imageUrl?: string | null;

  reportedById: string;
  volunteerId?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Incident History
 */
export interface IncidentHistory {
  id: string;
  incidentId: string;
  action: string;
  performedBy: string;
  createdAt: Date;
}

/**
 * Incident Statistics
 */
export interface IncidentStatistics {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  criticalIncidents: number;
}

/**
 * Nearby Incident
 */
export interface NearbyIncident {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  distance: number;
}

/**
 * Incident Image
 */
export interface IncidentImage {
  id: string;
  imageUrl: string;
  uploadedAt: Date;
}

/**
 * Disaster Type
 */
export type DisasterType =
  | "FLOOD"
  | "EARTHQUAKE"
  | "FIRE"
  | "LANDSLIDE"
  | "CYCLONE"
  | "ACCIDENT"
  | "OTHER";

/**
 * Severity
 */
export type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

/**
 * Incident Status
 */
export type IncidentStatus =
  | "REPORTED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CANCELLED";