import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

const router = Router();

export default router;
