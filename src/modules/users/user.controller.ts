import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserDto } from './dtos/user.dto'
import { AuthorizeRoles } from '../../base/guards/authorization.guard'
import { UserRole } from '../../../shared/enums'
import { appUserModelToDto } from './user.mapping'
import { ZodPipe } from '../../base/pipes/zod.pipe'
import { CreateUserDtoSchema, UpdateUserDtoSchema } from '../../../shared/dtos'

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @AuthorizeRoles([UserRole.ADMIN])
  @Get('all')
  async getAll(@Query() page: number, @Query() limit: number): Promise<UserDto[]> {
    const users = await this.userService.getAllUsers(page, limit)
    return users.map(user => appUserModelToDto(user))
  }

  @AuthorizeRoles([UserRole.ADMIN, UserRole.CUSTOMER])
  @Get('current')
  async getCurrent(): Promise<UserDto> {
    const user = await this.userService.getCurrentUser()
    return appUserModelToDto(user)
  }

  @AuthorizeRoles([UserRole.ADMIN])
  @Post('create')
  async create(@Body(new ZodPipe(CreateUserDtoSchema)) createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.createUser(createUserDto.email, createUserDto.password, createUserDto.role)
    return appUserModelToDto(user)
  }

  @AuthorizeRoles([UserRole.ADMIN, UserRole.CUSTOMER])
  @Post('update')
  async update(@Body(new ZodPipe(UpdateUserDtoSchema)) updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.updateUser(updateUserDto)
    return appUserModelToDto(user)
  }

}
