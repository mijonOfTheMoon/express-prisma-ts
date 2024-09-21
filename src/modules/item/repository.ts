import { Item, PrismaClient } from "@prisma/client";
import { CreateItemDomain, UpdateItemDomain } from "./domain";

export interface IRepository {
  create: (data: CreateItemDomain) => Promise<Item>;
  findAll: () => Promise<Item[]>;
  updateById: (id: number, data: UpdateItemDomain) => Promise<Item>;
  deleteById: (id: number) => Promise<Item>;
}

export class Repository implements IRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }
  
  async create(data: CreateItemDomain): Promise<Item> {
    return await this.db.item.create({
      data,
    });
  }

  async findAll(): Promise<Item[]> {
    return await this.db.item.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async updateById(id: number, data: UpdateItemDomain): Promise<Item> {
    return await this.db.item.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: number): Promise<Item> {
    return await this.db.item.delete({
      where: {
        id,
      },
    });
  }
}
