import { PrismaClient, Incident } from "@prisma/client";

import {
  CreateIncidentDTO,
  UpdateIncidentDTO,
  IncidentFilterDTO,
} from "../dto/incident.dto";

const prisma = new PrismaClient();

/**
 * Create Incident
 */
export const create = async (
  userId: string,
  data: CreateIncidentDTO
): Promise<Incident> => {
  return prisma.incident.create({
    data: {
      ...data,
      reportedById: userId,
      status: "REPORTED",
    },
  });
};

/**
 * Get All Incidents
 */
export const findAll = async (
  filter: IncidentFilterDTO
): Promise<Incident[]> => {
  return prisma.incident.findMany({
    where: {
      disasterType: filter.disasterType,
      severity: filter.severity,
      status: filter.status,
      city: filter.city,
    },
    skip: ((filter.page ?? 1) - 1) * (filter.limit ?? 10),
    take: filter.limit ?? 10,
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get Incident By ID
 */
export const findById = async (
  id: string
): Promise<Incident | null> => {
  return prisma.incident.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Update Incident
 */
export const update = async (
  id: string,
  data: Partial<UpdateIncidentDTO>
): Promise<Incident> => {
  return prisma.incident.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete Incident
 */
export const deleteIncident = async (
  id: string
): Promise<Incident> => {
  return prisma.incident.delete({
    where: {
      id,
    },
  });
};

/**
 * Update Status
 */
export const updateStatus = async (
  id: string,
  status: string
): Promise<Incident> => {
  return prisma.incident.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

/**
 * Assign Volunteer
 */
export const assignVolunteer = async (
  id: string,
  volunteerId: string
): Promise<Incident> => {
  return prisma.incident.update({
    where: {
      id,
    },
    data: {
      volunteerId,
    },
  });
};

/**
 * Upload Incident Image
 */
export const uploadImage = async (
  id: string,
  imageUrl: string
): Promise<Incident> => {
  return prisma.incident.update({
    where: {
      id,
    },
    data: {
      imageUrl,
    },
  });
};

/**
 * Nearby Incidents
 */
export const getNearby = async (
  latitude: number,
  longitude: number,
  radius: number
): Promise<Incident[]> => {

  // Placeholder implementation.
  // Replace later with PostGIS or raw SQL.

  return prisma.incident.findMany({
    take: 50,
  });

};

/**
 * Incident Statistics
 */
export const getStatistics = async () => {

  const totalIncidents =
    await prisma.incident.count();

  const activeIncidents =
    await prisma.incident.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

  const resolvedIncidents =
    await prisma.incident.count({
      where: {
        status: "RESOLVED",
      },
    });

  const criticalIncidents =
    await prisma.incident.count({
      where: {
        severity: "CRITICAL",
      },
    });

  return {
    totalIncidents,
    activeIncidents,
    resolvedIncidents,
    criticalIncidents,
  };

};

/**
 * Incident History
 */
export const getHistory = async (
  incidentId: string
) => {

  return prisma.incidentHistory.findMany({
    where: {
      incidentId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

};