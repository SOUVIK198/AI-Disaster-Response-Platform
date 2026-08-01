import {
  CreateIncidentDTO,
  UpdateIncidentDTO,
  UpdateIncidentStatusDTO,
  AssignVolunteerDTO,
  UploadIncidentImageDTO,
  NearbyIncidentDTO,
  IncidentFilterDTO,
  IncidentStatisticsDTO,
  IncidentHistoryDTO,
} from "../dto/incident.dto";

/**
 * Incident Service Interface
 */
export interface IIncidentService {
  createIncident(
    userId: string,
    data: CreateIncidentDTO
  ): Promise<any>;

  getAllIncidents(
    filter: IncidentFilterDTO
  ): Promise<any[]>;

  getIncidentById(
    id: string
  ): Promise<any>;

  updateIncident(
    id: string,
    data: UpdateIncidentDTO
  ): Promise<any>;

  deleteIncident(
    id: string
  ): Promise<void>;

  updateStatus(
    id: string,
    data: UpdateIncidentStatusDTO
  ): Promise<any>;

  assignVolunteer(
    id: string,
    data: AssignVolunteerDTO
  ): Promise<any>;

  uploadImage(
    id: string,
    data: UploadIncidentImageDTO
  ): Promise<any>;

  getNearbyIncidents(
    data: NearbyIncidentDTO
  ): Promise<any[]>;

  getStatistics(): Promise<IncidentStatisticsDTO>;

  getHistory(
    id: string
  ): Promise<IncidentHistoryDTO[]>;
}

/**
 * Incident Repository Interface
 */
export interface IIncidentRepository {
  create(
    userId: string,
    data: CreateIncidentDTO
  ): Promise<any>;

  findAll(
    filter: IncidentFilterDTO
  ): Promise<any[]>;

  findById(
    id: string
  ): Promise<any>;

  update(
    id: string,
    data: Partial<UpdateIncidentDTO>
  ): Promise<any>;

  delete(
    id: string
  ): Promise<void>;

  updateStatus(
    id: string,
    status: string
  ): Promise<any>;

  assignVolunteer(
    id: string,
    volunteerId: string
  ): Promise<any>;

  uploadImage(
    id: string,
    imageUrl: string
  ): Promise<any>;

  getNearby(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<any[]>;

  getStatistics(): Promise<IncidentStatisticsDTO>;

  getHistory(
    id: string
  ): Promise<IncidentHistoryDTO[]>;
}