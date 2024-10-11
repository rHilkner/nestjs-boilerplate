import { z } from 'zod';
import { UserRole } from './enums';

/**
 * DTO Schemas and Types
 */

// Create User DTO
export const CreateUserDtoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    role: z.nativeEnum(UserRole),
});
export type ICreateUserDTO = z.infer<typeof CreateUserDtoSchema>;

// Update User DTO
export const UpdateUserDtoSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
});
export type IUpdateUserDTO = z.infer<typeof UpdateUserDtoSchema>;

// Login DTO
export const LoginDtoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
});
export type ILoginDTO = z.infer<typeof LoginDtoSchema>;

// Sign Up DTO
export const SignUpDtoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type ISignUpDTO = z.infer<typeof SignUpDtoSchema>;

// User DTO (for returning user data)
export const UserDtoSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
});
export type IUserDTO = z.infer<typeof UserDtoSchema>;
