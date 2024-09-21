import { Router } from "express";
import { db } from "../../utils/db";
import { Repository } from "./repository";
import { UseCase } from "./usecase";
import { Controller } from "./controller";

const router = Router();

const repository = new Repository(db);
const useCase = new UseCase(repository);
const controller = new Controller(useCase);

export default router;
