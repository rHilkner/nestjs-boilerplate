import { User } from '../user.model';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role';
import { IUserDto } from '../../../../shared/dtos';

export class UserDto implements IUserDto {
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }

  static fromModel(user: User): UserDto {
    return new UserDto(user);
  }
}
