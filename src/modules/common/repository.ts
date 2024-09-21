import { PrismaClient } from "@prisma/client";

export interface IRepository {

}

export class Repository implements IRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }
  
}
