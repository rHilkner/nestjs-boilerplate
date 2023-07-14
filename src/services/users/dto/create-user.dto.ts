import { UserRole } from '../../../common/enums/user-role';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
