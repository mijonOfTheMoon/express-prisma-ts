import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { GetMeResponseDto, LoginUserRequestDto, LoginUserResponseDto, RegisterUserRequestDto, RegisterUserResponseDto } from './dto';
import { IAuthRepository } from './repository';
import { ApiErrorClass } from '../../utils/error';
import jwt from 'jsonwebtoken';

export interface IAuthUseCase {
    hashPassword: (password: string) => Promise<string>;
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    findUserByEmail: (email: string) => Promise<User | null>;
    findUserById: (id: number) => Promise<User | null>;
    registerUser: (data: RegisterUserRequestDto) => Promise<RegisterUserResponseDto>;    
    loginUser: (data: LoginUserRequestDto) => Promise<LoginUserResponseDto>;
    getUser: (id: number) => Promise<GetMeResponseDto>;
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

    async findUserById(id: number): Promise<User | null> {
        return await this.repository.findUserById(id);
    }

    async registerUser(data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
        const check = await this.findUserByEmail(data.email);
        if (check) {
            throw new ApiErrorClass(false, 400, 'User already exists');
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
            throw new ApiErrorClass(false, 404, 'User not found');
        }

        const match = await this.comparePassword(data.password, user.password);
        if (!match) {
            throw new ApiErrorClass(false, 400, 'Invalid Password');
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'secret', {
            expiresIn: '3d',
        });

        return {
            user : {
                email: user.email,
                name: user.name,
            },
            token,
        };
    }

    async getUser(id: number): Promise<GetMeResponseDto> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new ApiErrorClass(false, 404, 'User not found');
        }

        const res : GetMeResponseDto = {
            email: user.email,
            name: user.name,
        };

        return res;
    }
}