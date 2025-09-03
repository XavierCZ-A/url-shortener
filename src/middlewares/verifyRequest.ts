import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { config } from "../config/config";

interface UserPayload {
  id?: string;
  email: string;
}

const verifyRequest = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.get("authorization");

  if (!token) {
    return next();
  }

  try {
    const decodedUser = jwt.verify(token, config.JWT_SECRET) as UserPayload;

    req.user = decodedUser;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new CustomError(403, "Token no válido o expirado.");
    }
    throw new CustomError(500, "Error de servidor al verificar el token.");
  }
};

export default verifyRequest;
