import { AppUserModel } from '@prisma/client'
import { AppUserDTO } from '../../../shared/dtos/user-dtos'
import { UserRole } from '../../../shared/enums'

export function appUserModelToDto(user: AppUserModel): AppUserDTO {
  return {
    id: user.id,
    email: user.email,
    role: user.role as UserRole,
  };
}