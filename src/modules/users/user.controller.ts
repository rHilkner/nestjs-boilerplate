import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthorizeRoles } from '../../base/guards/authorization.guard'
import { UserRole } from '../../../shared/enums'
import { appUserModelToDto } from './user.mapping'
import { ZodPipe } from '../../base/pipes/zod.pipe'
import {
  AppUserDTO,
  CreateUserDTO,
  CreateUserDtoSchema,
  UpdateUserDTO,
  UpdateUserDtoSchema,
} from '../../../shared/dtos'

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @AuthorizeRoles([UserRole.ADMIN])
  @Get('all')
  async getAll(@Query() page: number, @Query() limit: number): Promise<AppUserDTO[]> {
    const users = await this.userService.getAllUsers(page, limit)
    return users.map(user => appUserModelToDto(user))
  }

  @AuthorizeRoles([UserRole.ADMIN, UserRole.CUSTOMER])
  @Get('current')
  async getCurrent(): Promise<AppUserDTO> {
    const user = await this.userService.getCurrentUser()
    return appUserModelToDto(user)
  }

  @AuthorizeRoles([UserRole.ADMIN])
  @Post('create')
  async create(@Body(new ZodPipe(CreateUserDtoSchema)) createUserDto: CreateUserDTO): Promise<AppUserDTO> {
    const user = await this.userService.createUser(createUserDto)
    return appUserModelToDto(user)
  }

  @AuthorizeRoles([UserRole.ADMIN, UserRole.CUSTOMER])
  @Post('update')
  async update(@Body(new ZodPipe(UpdateUserDtoSchema)) updateUserDto: UpdateUserDTO): Promise<AppUserDTO> {
    const user = await this.userService.updateUser(updateUserDto)
    return appUserModelToDto(user)
  }

}
