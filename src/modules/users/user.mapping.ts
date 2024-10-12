import { AppUserModel } from '@prisma/client'
import { IUserDTO } from '../../../shared/dtos'
import { UserRole } from '../../../shared/enums'

export function appUserModelToDto(user: AppUserModel): IUserDTO {
  return {
    id: user.id,
    email: user.email,
    role: user.role as UserRole,
  };
}