import { User } from "@prisma/client";
import { Request } from "express";

export interface RequestWithAuth extends Request {
  user?: User;
}