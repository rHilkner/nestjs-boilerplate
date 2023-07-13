import { User, Role } from './user.model';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }

  static fromModel(user: User): UserDto {
    return new UserDto(user);
  }
}
