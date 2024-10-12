import { z } from 'zod'
import { UserRole } from '../enums'

// Create User DTO
export const CreateUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  role: z.nativeEnum(UserRole),
});
export type CreateUserDTO = z.infer<typeof CreateUserDtoSchema>;

// Update User DTO
export const UpdateUserDtoSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});
export type UpdateUserDTO = z.infer<typeof UpdateUserDtoSchema>;

// Login DTO
export const LoginDtoSchema = z.object({
  email: z.string().email(),
});
export type LoginDTO = z.infer<typeof LoginDtoSchema>;

// User DTO (for returning user data)
export const AppUserDtoSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});
export type AppUserDTO = z.infer<typeof AppUserDtoSchema>;