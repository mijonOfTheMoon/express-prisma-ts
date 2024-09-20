import { Router } from "express";
import { AuthController } from "./controller";
import { validate } from "../../middleware/validator";
import { RegisterUserSchema } from "./dto";
import { AuthRepository } from "./repository";
import { AuthUseCase } from "./usecase";
import { db } from "../../utils/db";

const router = Router();

const authRepository = new AuthRepository(db);
const authUseCase = new AuthUseCase(authRepository);
const authController = new AuthController(authUseCase);

router.post("/login", authController.login);
router.post(
  "/register",
  validate({ body: RegisterUserSchema }),
  authController.register
);

export default router;
