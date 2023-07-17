import { UserRole } from '../../../common/enums/user-role';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ICreateUserDto } from '../../../../shared/dtos';

export class CreateUserDto implements ICreateUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsEnum(UserRole)
    role: UserRole;

    constructor(props: { email: string, password: string, role: UserRole }) {
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
    }
}
