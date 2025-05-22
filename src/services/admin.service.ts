import AdminRepository from "../repositories/admin.repository";
import { Complaint } from "@prisma/client";

export default class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async getAllComplaints(): Promise<Complaint[]> {
    return this.adminRepository.findAllComplaints();
  }

  async getComplaintById(id: number): Promise<Complaint | null> {
    return this.adminRepository.findComplaintById(id);
  }

  async updateComplaintStatus(id: number, status: boolean): Promise<Complaint | null> {
    return this.adminRepository.updateComplaintStatus(id, status);
  }

  async softDeleteComplaint(id: number): Promise<boolean> {
    return this.adminRepository.softDeleteComplaint(id);
  }
}
