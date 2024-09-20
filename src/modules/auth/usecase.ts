import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { LoginUserRequestDto, LoginUserResponseDto, RegisterUserRequestDto, RegisterUserResponseDto } from './dto';
import { IAuthRepository } from './repository';
import { throwError } from '../../utils/error';

export interface IAuthUseCase {
    hashPassword: (password: string) => Promise<string>;
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    findUserByEmail: (email: string) => Promise<User | null>;
    registerUser: (data: RegisterUserRequestDto) => Promise<RegisterUserResponseDto>;    
}

export class AuthUseCase implements IAuthUseCase {
    private repository: IAuthRepository;

    constructor(repository: IAuthRepository) {
        this.repository = repository;
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.repository.findUserByEmail(email);
    }

    async registerUser(data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
        const check = await this.findUserByEmail(data.email);
        if (check) {
            throwError(400, 'User already exists');
        }

        const hashedPassword = await this.hashPassword(data.password);
        const repo = await this.repository.createUser({
            email: data.email,
            name: data.name,
            password: hashedPassword,
        });

        const res : RegisterUserResponseDto = {
            email: repo.email,
            name: repo.name,
        }

        return res;
    }

    async loginUser(data: LoginUserRequestDto): Promise<LoginUserResponseDto> {
        const user = await this.findUserByEmail(data.email);
        if (!user) {
            throw new Error('User not found');
        }

        const match = await this.comparePassword(data.password, user.password);
        if (!match) {
            throw new Error('Invalid password');
        }

        return {
            email: user.email,
        };
    }

}