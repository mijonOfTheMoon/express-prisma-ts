import { IUseCase } from "./usecase";

export class Controller {
  private useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
}
