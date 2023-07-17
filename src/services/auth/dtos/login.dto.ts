import { IsEmail } from 'class-validator';
import { ILoginDto } from '../../../../shared/dtos';

export class LoginDto implements ILoginDto {
    @IsEmail()
    email: string;
    password: string;

    constructor(props: { email: string, password: string }) {
        this.email = props.email;
        this.password = props.password;
    }
}
