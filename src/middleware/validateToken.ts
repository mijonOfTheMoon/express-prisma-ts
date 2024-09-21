import { User } from "@prisma/client";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import { RequestWithAuth } from "../types/interfaces";

export const verifyToken = (req: RequestWithAuth, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(errorResponse("Invalid token"));
  }

  try {
    const [_, tokenValue] = token.split(" "); 
    const user = jwt.verify(tokenValue, process.env.SECRET_KEY || "secret") as unknown as User;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(errorResponse("Invalid token"));
  }
}

