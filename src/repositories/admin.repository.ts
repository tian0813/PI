import { PrismaClient, Complaint } from "@prisma/client";

export default class AdminRepository {
  constructor(private prisma: PrismaClient) {}

  async findAllComplaints(): Promise<Complaint[]> {
    return this.prisma.complaint.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: { user: true }, // kalau mau info user juga
    });
  }

  async findComplaintById(id: number): Promise<Complaint | null> {
    return this.prisma.complaint.findFirst({
      where: { id, isDeleted: false },
      include: { user: true },
    });
  }

  async updateComplaintStatus(id: number, status: boolean): Promise<Complaint | null> {
    return this.prisma.complaint.updateMany({
      where: { id, isDeleted: false },
      data: { status },
    }).then(result => {
      if (result.count === 0) return null;
      return this.findComplaintById(id);
    });
  }

  async softDeleteComplaint(id: number): Promise<boolean> {
    const result = await this.prisma.complaint.updateMany({
      where: { id, isDeleted: false },
      data: { isDeleted: true },
    });
    return result.count > 0;
  }
}
