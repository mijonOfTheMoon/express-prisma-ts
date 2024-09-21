import { Router } from "express";
import { db } from "../../utils/db";
import { Repository } from "./repository";
import { UseCase } from "./usecase";
import { Controller } from "./controller";

const router = Router();

const repository = new Repository(db);
const useCase = new UseCase(repository);
const controller = new Controller(useCase);

router.post("/", controller.create);
router.get("/", controller.getItem);
router.put("/:id", controller.updateItem);
router.delete("/:id", controller.deleteItem);

export default router;
