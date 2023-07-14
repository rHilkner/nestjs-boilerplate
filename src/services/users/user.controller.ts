import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Roles } from '../../base/guards/roles.guard';
import { UserRole } from '../../common/enums/user-role';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Roles(UserRole.ADMIN)
    @Get('all')
    async getAll(): Promise<UserDto[]> {
        const users = await this.userService.getAllUsers();
        return users.map(user => user.toDto());
    }

    @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
    @Get('current')
    async getCurrent(): Promise<UserDto> {
        const user = await this.userService.getCurrentUser();
        return user.toDto();
    }

    @Roles(UserRole.ADMIN)
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto):Promise<UserDto> {
        const user = await this.userService.createUser(createUserDto.email, createUserDto.password, createUserDto.role);
        return user.toDto();
    }

    @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
    @Post('update')
    async update(@Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        const user = await this.userService.updateUser(updateUserDto);
        return user.toDto();
    }

}
