import { Request, Response } from "express";
import { IAuthUseCase } from "./usecase";
import { ApiErrorClass } from "../../utils/error";
import { errorResponse, successResponse } from "../../utils/response";
import { RequestWithAuth } from "../../types/interfaces";

export class AuthController {
  private authUseCase: IAuthUseCase;

  constructor(authUseCase: IAuthUseCase) {
    this.authUseCase = authUseCase;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body;

      const user = await this.authUseCase.registerUser({
        email,
        name,
        password,
      });
      return res.status(201).json(successResponse("User created", user));
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error("Internal Error:", error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await this.authUseCase.loginUser({
        email,
        password,
      });
      return res.status(200).json(successResponse("Login success", user));
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error("Internal Error:", error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  };

  me = async (req: RequestWithAuth, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiErrorClass(false, 401, "Unauthorized");
      }
      const data = await this.authUseCase.getUser(user.id);
      return res.status(200).json(successResponse("User data", data));
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error("Internal Error:", error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  };
}
