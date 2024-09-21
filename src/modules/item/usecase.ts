import { CreateItemRequestDTO, CreateItemResponseDTO, FindAllItemsResponseDTO, UpdateItemRequestDTO, UpdateItemResponseDTO } from './dto';
import { IRepository } from './repository';

export interface IUseCase {
    create: (data: CreateItemRequestDTO) => Promise<CreateItemResponseDTO>;
    findAll: () => Promise<FindAllItemsResponseDTO>;
    updateById: (data: UpdateItemRequestDTO) => Promise<UpdateItemResponseDTO>;
    deleteById: (id: number) => Promise<UpdateItemResponseDTO>;
}

export class UseCase implements IUseCase {
    private repository: IRepository;

    constructor(repository: IRepository) {
        this.repository = repository;
    }

    async create(data: CreateItemRequestDTO) : Promise<CreateItemResponseDTO> {
        const item = await this.repository.create(data);
        return { item };
    }

    async findAll() : Promise<FindAllItemsResponseDTO> {
        const data = await this.repository.findAll();
        return { items: data };
    }

    async updateById(data: UpdateItemRequestDTO) : Promise<UpdateItemResponseDTO> {
        const item = await this.repository.updateById(data.id, data);
        return { item };
    }

    async deleteById(id: number) {
        const item = await this.repository.deleteById(id);
        return { item };
    }
}