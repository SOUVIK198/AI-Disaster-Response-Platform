/**
 * Create Incident DTO
 */
export interface CreateIncidentDTO {
  title: string;
  description: string;
  disasterType:
    | "FLOOD"
    | "EARTHQUAKE"
    | "FIRE"
    | "LANDSLIDE"
    | "CYCLONE"
    | "ACCIDENT"
    | "OTHER";

  severity:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  latitude: number;
  longitude: number;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
}

/**
 * Update Incident DTO
 */
export interface UpdateIncidentDTO {
  title?: string;
  description?: string;

  severity?:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

/**
 * Update Status DTO
 */
export interface UpdateIncidentStatusDTO {
  status:
    | "REPORTED"
    | "IN_PROGRESS"
    | "RESOLVED"
    | "CANCELLED";
}

/**
 * Assign Volunteer DTO
 */
export interface AssignVolunteerDTO {
  volunteerId: string;
}

/**
 * Upload Incident Image DTO
 */
export interface UploadIncidentImageDTO {
  imageUrl: string;
}

/**
 * Nearby Incident DTO
 */
export interface NearbyIncidentDTO {
  latitude: number;
  longitude: number;
  radius: number;
}

/**
 * Incident Filter DTO
 */
export interface IncidentFilterDTO {
  disasterType?: string;
  severity?: string;
  status?: string;
  city?: string;

  page?: number;
  limit?: number;
}

/**
 * Incident Statistics DTO
 */
export interface IncidentStatisticsDTO {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  criticalIncidents: number;
}

/**
 * Incident History DTO
 */
export interface IncidentHistoryDTO {
  id: string;
  incidentId: string;
  action: string;
  performedBy: string;
  createdAt: Date;
}