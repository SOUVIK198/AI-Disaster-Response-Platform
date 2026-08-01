import { Request, Response, NextFunction } from "express";

import * as incidentService from "../service/incident.service";

/**
 * Create Incident
 */
export const createIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const incident = await incidentService.createIncident(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Incidents
 */
export const getAllIncidents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incidents = await incidentService.getAllIncidents(
      req.query as any
    );

    res.status(200).json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Incident By ID
 */
export const getIncidentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incident = await incidentService.getIncidentById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Incident
 */
export const updateIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incident = await incidentService.updateIncident(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Incident updated successfully",
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Incident
 */
export const deleteIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await incidentService.deleteIncident(req.params.id);

    res.status(200).json({
      success: true,
      message: "Incident deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Incident Status
 */
export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incident = await incidentService.updateStatus(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Incident status updated successfully",
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Assign Volunteer
 */
export const assignVolunteer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incident = await incidentService.assignVolunteer(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Volunteer assigned successfully",
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Incident Image
 */
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageUrl = req.file?.path || "";

    const incident = await incidentService.uploadImage(
      req.params.id,
      { imageUrl }
    );

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Nearby Incidents
 */
export const getNearbyIncidents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incidents =
      await incidentService.getNearbyIncidents(
        req.query as any
      );

    res.status(200).json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Incident Statistics
 */
export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statistics =
      await incidentService.getStatistics();

    res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Incident History
 */
export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const history =
      await incidentService.getHistory(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};