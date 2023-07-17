import { IsEmail, MinLength } from 'class-validator';
import { ISignUpDto } from '../../../../shared/dtos';

export class SignUpDto implements ISignUpDto {
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string;

    constructor(props: { email: string, password: string }) {
        this.email = props.email;
        this.password = props.password;
    }
}
