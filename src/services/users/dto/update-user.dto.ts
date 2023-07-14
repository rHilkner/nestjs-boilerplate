import { UserRole } from '../../../common/enums/UserRole';

export class UpdateUserDto {
    id: string;
    email: string;
    role: UserRole;

    constructor(props: { id: string, email: string, role: UserRole }) {
        this.id = props.id;
        this.email = props.email;
        this.role = props.role;
    }
}
