import { Request, Response } from "express";
import AdminService from "../services/admin.service";
import { getErrorMessage } from "../utils/error";

export default class AdminController {
  constructor(private adminService: AdminService) {}

  async getAllComplaints(_req: Request, res: Response) {
    try {
      const complaints = await this.adminService.getAllComplaints();
      return res.status(200).json({
        success: true,
        data: complaints,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async updateComplaintStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if (typeof status !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "Status must be a boolean value (true or false)",
        });
      }

      const updated = await this.adminService.updateComplaintStatus(id, status);

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async getComplaintById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const complaint = await this.adminService.getComplaintById(id);

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found",
        });
      }

      res.json({
        success: true,
        data: complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async softDeleteComplaint(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await this.adminService.softDeleteComplaint(id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found or already deleted",
        });
      }

      res.json({
        success: true,
        message: "Complaint successfully soft deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }
}
