import { NextFunction, Response } from "express";
import { responses } from "../constants";
import { AuthRequest } from "../middleware/auth";
import ComplaintService from "../services/complaint.service";
import { ComplaintFilters } from "../types/complaint";
import { PaginationParams } from "../types/pagination";

class ComplaintController {
  private complaintService: ComplaintService;

  constructor(complaintService: ComplaintService) {
    this.complaintService = complaintService;
  }

  async getAllComplaints(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const filters: ComplaintFilters = {
        search: req.query.search as string,
        startDate: req.query.startDate
          ? new Date(req.query.startDate as string)
          : undefined,
        endDate: req.query.endDate
          ? new Date(req.query.endDate as string)
          : undefined,
      };

      const result = await this.complaintService.getAllComplaints(
        req?.user.id,
        pagination,
        filters
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successGetComplaints,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getComplaintById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.complaintService.getComplaintById(
        Number(req.params.id),
        req.user.id
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: responses.successGetComplaints,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!req.file || !req.file.path) {
        return res.status(400).json({
          success: false,
          message: "Photo is required",
        });
      }

      const result = await this.complaintService.createComplaint({
        location: req.body.location,
        description: req.body.description,
        photo: req.file.path,
        // status: req.body.status,
        email: req.user.email,
      });

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(201).json({
        success: true,
        message: responses.successCreateComplaint,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.complaintService.updateComplaint(
        req.user.id,
        Number(req.params.id),
        req.body
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: responses.successUpdateComplaint,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(500).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.complaintService.softDeleteComplaint(
        Number(req.params.id),
        req.user.id
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(204).json({
        success: true,
        message: responses.successDeleteComplaint,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ComplaintController;
