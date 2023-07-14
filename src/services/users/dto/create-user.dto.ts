import { UserRole } from '../../../common/enums/UserRole';

export class CreateUserDto {
    email: string;
    password: string;
    role: UserRole;

    constructor(props: { email: string, password: string, role: UserRole }) {
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
    }
}
