// src/dto/registerUser.dto.ts
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(3, "must be at least 3 characters long"),
  password: z.string().min(6, "must be at least 6 characters long"),
});

export type RegisterUserRequestDto = z.infer<typeof RegisterUserSchema>;

export type RegisterUserResponseDto = {
  email: string;
  name: string | null;
};

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginUserRequestDto = z.infer<typeof LoginUserSchema>;

export type LoginUserResponseDto = {
  email: string;
};