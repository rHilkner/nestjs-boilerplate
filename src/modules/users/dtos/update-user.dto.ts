import { UserRole } from '../../../common/enums/user-role';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IUpdateUserDto } from '../../../../shared/dtos';

export class UpdateUserDto implements IUpdateUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
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
