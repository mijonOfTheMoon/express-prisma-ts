import { IRepository } from './repository';

export interface IUseCase {

}

export class UseCase implements IUseCase {
    private repository: IRepository;

    constructor(repository: IRepository) {
        this.repository = repository;
    }
}