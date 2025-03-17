import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getErrorMessage } from "../utils/error";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authorize = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  
};
