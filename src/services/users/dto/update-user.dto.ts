import { UserRole } from '../../../common/enums/user-role';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    id: string;
    @IsEmail()
    email: string;
    @IsEnum(UserRole)
    role: UserRole;

    constructor(props: { id: string, email: string, role: UserRole }) {
        this.id = props.id;
        this.email = props.email;
        this.role = props.role;
    }
}
