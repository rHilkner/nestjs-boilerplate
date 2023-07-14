import { IsEmail } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;
    password: string;

    constructor(props: { email: string, password: string }) {
        this.email = props.email;
        this.password = props.password;
    }
}
