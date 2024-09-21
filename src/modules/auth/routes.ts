import { Router } from "express";
import { AuthController } from "./controller";
import { validate } from "../../middleware/validator";
import { RegisterUserSchema } from "./dto";
import { AuthRepository } from "./repository";
import { AuthUseCase } from "./usecase";
import { db } from "../../utils/db";
import { verifyToken } from "../../middleware/validateToken";

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
router.get("/me", verifyToken, authController.me);

export default router;
