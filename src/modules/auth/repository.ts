import { PrismaClient, User } from "@prisma/client";
import { RegisterUserDomain } from "./domain";

export interface IAuthRepository {
  createUser: (data: RegisterUserDomain) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | null>; // Specify that it may return null if no user is found
}

export class AuthRepository implements IAuthRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }
  async createUser(data: RegisterUserDomain): Promise<User> {
    return await this.db.user.create({
      data,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }
}
