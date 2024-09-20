import { Request, Response } from "express";
import { IAuthUseCase } from "./usecase";
import { ApiErrorClass } from "../../utils/error";
import { errorResponse, successResponse } from "../../utils/response";

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
      console.log(error);
      if (error instanceof ApiErrorClass) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.error("Internal Error:", error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      return res.status(200).json({ message: "Login success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
