import { IUseCase } from "./usecase";
import { Request, Response } from "express";

export class Controller {
  private useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  create = async(req: Request, res: Response) => {
    try {
      const {name, price} = req.body;
      const response = await this.useCase.create({
        name,
        price,
      });
      res.status(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getItem = async(req: Request, res: Response) => {
    try {
      const response = await this.useCase.findAll();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  updateItem = async(req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const {name, price} = req.body;
      const response = await this.useCase.updateById({
        id,
        name,
        price,
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  deleteItem = async(req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const response = await this.useCase.deleteById(id);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
