import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SignUpDTO } from "../types/user";
import UserRepository from "../repositories/user.repository";
import { getErrorMessage } from "../utils/error";

const SECRET_KEY = process.env.JWT_SECRET as string;

export default class AuthService {
  
}
