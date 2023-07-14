import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string;

    constructor(props: { email: string, password: string }) {
        this.email = props.email;
        this.password = props.password;
    }
}
