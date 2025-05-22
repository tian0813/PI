import e, { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { getErrorMessage } from "../utils/error";
import { generateToken, verifyToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth";
import { error } from "console";

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signUp(req: Request, res: Response) {
    try {
      const { name, email, password, role } = await req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const {
        id,
        email: userEmail,
        error,
      } = await this.authService.signUp({ email, name, password, role });
      if (error) {
        return res.status(500).json({
          success: false,
          message: error,
        });
      }

      const token = generateToken(userEmail as string, id as number);
      return res.status(201).json({
        success: true,
        message: "User created",
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email or password are required",
        });
      }

      const { token, error } = await this.authService.signIn(email, password);
      if (error) {
        return res.status(500).json({
          success: false,
          message: getErrorMessage(error),
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login success",
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async authorize(req: AuthRequest, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] ?? "";
      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(400).json({
          success: false,
          message: "Invalid token",
        });
      }

      const { email, id, role } = decoded;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Invalid token",
        });
      }

      const newToken = generateToken(email, id, role);
      return res.status(200).json({
        success: true,
        message: "Success",
        data: newToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }
}
