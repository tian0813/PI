import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin";
import AdminController from "../controllers/admin.controller";
import AdminService from "../services/admin.service";
import AdminRepository from "../repositories/admin.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const adminRepository = new AdminRepository(prisma);
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

const router = Router();

router.get("/complaints", isAdmin, (req, res) => adminController.getAllComplaints(req, res));
router.patch("/complaints/:id/status", isAdmin, (req, res) => adminController.updateComplaintStatus(req, res));
router.get("/complaints/:id", isAdmin, (req, res) => adminController.getComplaintById(req, res));
router.patch("/complaints/:id", isAdmin, (req, res) => adminController.softDeleteComplaint(req, res));

export default router;
